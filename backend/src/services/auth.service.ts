// server apara persiste os dados do usuário, como tokens de autenticação, informações de sessão, etc.
// Ele pode ser implementado usando bibliotecas como JWT (JSON Web Tokens) para criar e verificar tokens de autenticação, ou usando sessões para armazenar informações do usuário no servidor.

import { prismaClient } from "../../prisma/prisma"
import { LoginInput, RegisterInput } from "../dtos/input/auth.input"
import { comparePassword, hashPassword } from "../utils/hash"
import { User } from "@prisma/client"
import { signJwt } from "../utils/jwt"

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

    gerenerateTokens(user: User) {
        const token = signJwt({  id: user.id, email: user.email }, '15m')
        const refreshToken = signJwt({ id: user.id, email: user.email }, '1d')
        return { token, refreshToken, user }
    }

}