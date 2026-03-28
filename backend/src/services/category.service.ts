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
        createdAt: "desc"
      }
    })
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