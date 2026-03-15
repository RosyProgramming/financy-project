// server apara persiste os dados do usuário, como tokens de autenticação, informações de sessão, etc.
// Ele pode ser implementado usando bibliotecas como JWT (JSON Web Tokens) para criar e verificar tokens de autenticação, ou usando sessões para armazenar informações do usuário no servidor.
import crypto from "crypto"
import { prismaClient } from "../../prisma/prisma"
import { LoginInput, RegisterInput } from "../dtos/input/auth.input"
import { comparePassword, hashPassword } from "../utils/hash"
import { User } from "@prisma/client"
import { signJwt } from "../utils/jwt"
import { ForgotPasswordInput, ResetPasswordInput } from "../dtos/input/password.input"

export class AuthService {
     async login(data: LoginInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email,
            },
        })
        if (!existingUser) throw new Error('Usuário não cadastrado!')
        const compare = await comparePassword(data.password, existingUser.password)
        if (!compare) throw new Error('Senha inválida!')
        return this.gerenerateTokens(existingUser)
    }

    async register(data: RegisterInput){
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (existingUser) throw new Error('E-mail já cadastrado!')
            
        const hash = await hashPassword(data.password)

        const user = await prismaClient.user.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                password: hash,
            },
        })
        
        return this.gerenerateTokens(user)
    }

    async forgotPassword(data: ForgotPasswordInput) {

        const user = await prismaClient.user.findUnique({
            where: { email: data.email }
        })

        if (!user)
            throw new Error("Usuário não encontrado")

        const token = crypto.randomBytes(32).toString("hex")

        const expiry = new Date()
        expiry.setHours(expiry.getHours() + 1)

        await prismaClient.user.update({
            where: { id: user.id },
            data: {
            resetToken: token,
            resetTokenExpiry: expiry
            }
        })

        return {
            message: "Token de recuperação gerado",
            token
        }
    }

    async resetPassword(data: ResetPasswordInput) {

        const user = await prismaClient.user.findFirst({
            where: {
            resetToken: data.token
            }
        })

        if (!user)
            throw new Error("Token inválido")

        if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date())
            throw new Error("Token expirado")

        const hash = await hashPassword(data.newPassword)

        await prismaClient.user.update({
            where: { id: user.id },
            data: {
            password: hash,
            resetToken: null,
            resetTokenExpiry: null
            }
        })

        return {
            message: "Senha redefinida com sucesso"
        }
    }

    gerenerateTokens(user: User) {
        const token = signJwt({  id: user.id, email: user.email }, '15m')
        const refreshToken = signJwt({ id: user.id, email: user.email }, '1d')
        return { token, refreshToken, user }
    }

}