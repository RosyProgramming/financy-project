import { prismaClient } from "../../prisma/prisma"
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input"

export class CategoryService {

  async create(data: CreateCategoryInput, userId: string) {

    return prismaClient.category.create({
      data: {
        ...data,
        userId
      }
    })
  }

  async list(userId: string) {

    return prismaClient.category.findMany({
      where: {
        userId
      },
      include: {
        _count: {
          select: { transactions: true },
        },
      },
      orderBy: {
        title: "asc"
      }
    })
  }

 async getSummary(userId: string) {

    // total de categorias
    const totalCategories = await prismaClient.category.count({
      where: { userId },
    })

    // total de transações do usuário
    const totalTransactions = await prismaClient.transaction.count({
      where: { userId },
    })

    // categoria mais usada
    const mostUsed = await prismaClient.transaction.groupBy({
      by: ["categoryId"],
      where: { userId },
      _count: {
        categoryId: true,
      },
      orderBy: {
        _count: {
          categoryId: "desc",
        },
      },
      take: 1,
    })

    let mostUsedCategory = null

    if (mostUsed.length > 0) {
      const category = await prismaClient.category.findUnique({
        where: {
          id: mostUsed[0].categoryId,
        },
        select: {
          title: true,
        },
      })

      mostUsedCategory = {
        title: category?.title || "",
        total: mostUsed[0]._count.categoryId,
      }
    }

    return {
      totalCategories,
      totalTransactions,
      mostUsedCategory,
    }
  }

  async update(id: string, data: UpdateCategoryInput, userId: string) {

    const category = await prismaClient.category.findFirst({
      where: { id, userId }
    })

    if (!category) throw new Error("Categoria não encontrada")

    return prismaClient.category.update({
      where: { id },
      data
    })
  }

  async delete(id: string, userId: string) {

    const category = await prismaClient.category.findFirst({
      where: { id, userId }
    })

    if (!category) throw new Error("Categoria não encontrada")

    return prismaClient.category.delete({
      where: { id }
    })
  }
}