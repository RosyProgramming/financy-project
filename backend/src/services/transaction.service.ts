import { prismaClient } from "../../prisma/prisma"
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input"

export class TransactionService {

  async create(data: CreateTransactionInput, userId: string) {

    return prismaClient.transaction.create({
      data: {
        ...data,
        userId
      }
    })
  }

  async list(userId: string) {

    return prismaClient.transaction.findMany({
      where: {
        userId
      },
      orderBy: {
        date: "desc"
      }
    })
  }

  async update(id: string, data: UpdateTransactionInput, userId: string) {

    const transaction = await prismaClient.transaction.findFirst({
      where: { id, userId }
    })

    if (!transaction) throw new Error("Transação não encontrada")

    return prismaClient.transaction.update({
      where: { id },
      data
    })
  }

  async delete(id: string, userId: string) {

    const transaction = await prismaClient.transaction.findFirst({
      where: { id, userId }
    })

    if (!transaction) throw new Error("Transação não encontrada")

    return prismaClient.transaction.delete({
      where: { id }
    })
  }
}