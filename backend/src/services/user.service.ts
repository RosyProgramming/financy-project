import { prismaClient } from '../../prisma/prisma'

export class UserService {
    async findUser(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) throw new Error('Usuário não existe')
    return user
  }
}