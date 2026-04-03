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

  async list(
    userId: string,
    {
      page,
      limit,
      filters,
    }: {
      page: number
      limit: number
      filters?: {
        search?: string
        categoryId?: string
        type?: "INCOME" | "EXPENSE"
        month?: string
      }
    }
  ) {
    const skip = (page - 1) * limit

    const where: any = {
      userId,
    }

    // busca
    if (filters?.search) {
      where.description = {
        contains: filters.search
      }
    }

    //  categoria
    if (filters?.categoryId) {
      where.categoryId = filters.categoryId
    }

    //  tipo
    if (filters?.type) {
      where.type = filters.type
    }

    //  mês
    if (filters?.month) {
      const [year, month] = filters.month.split("-").map(Number)

      const start = new Date(year, month - 1, 1)
      const end = new Date(year, month, 0, 23, 59, 59)

      where.date = {
        gte: start,
        lte: end,
      }
    }

    const [data, total] = await Promise.all([
      prismaClient.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: "desc" },
        include: { category: true },
      }),
      prismaClient.transaction.count({
        where,
      }),
    ])

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    }
  }

  async getMonths(userId: string) {
    const transactions = await prismaClient.transaction.findMany({
      where: { userId },
      select: { date: true },
      orderBy: { date: "desc" },
    })

    const map = new Map<string, string>()

    for (const tx of transactions) {
      const date = new Date(tx.date)

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")

      const value = `${year}-${month}`

      const monthName = date.toLocaleDateString("pt-BR", {
        month: "long",
      })

      const label = monthName.charAt(0).toUpperCase() + monthName.slice(1) + " / " + year

      const formattedLabel = label.charAt(0).toUpperCase() + label.slice(1)

      map.set(value, formattedLabel)
    }

    return Array.from(map.entries()).map(([value, label]) => ({
      value,
      label,
    }))
  }

  async update(id: string, data: UpdateTransactionInput, userId: string) {

    const transaction = await prismaClient.transaction.findFirst({
      where: { id, userId }
    })

    if (!transaction) throw new Error("Transação não encontrada")

    return prismaClient.transaction.update({
      where: { id },
      data,
      include: { category: true } 
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