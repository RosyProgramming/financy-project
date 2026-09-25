import { describe, expect, it, vi } from "vitest"
import { TransactionService } from "../src/services/transaction.service.js"
import { prismaClient } from "../prisma/prisma.js"

describe("TransactionService - list", () => {
  it("deve calcular corretamente a paginação", async () => {
    vi.spyOn(prismaClient.transaction, "findMany").mockResolvedValue([])
    vi.spyOn(prismaClient.transaction, "count").mockResolvedValue(25)

    const service = new TransactionService()

    const result = await service.list("user-123", {
      page: 2,
      limit: 10,
    })

    expect(result.meta.total).toBe(25)
    expect(result.meta.page).toBe(2)
    expect(result.meta.lastPage).toBe(3)

    expect(prismaClient.transaction.findMany).toHaveBeenCalledWith({
      where: {
        userId: "user-123",
      },
      skip: 10,
      take: 10,
      orderBy: {
        date: "desc",
      },
      include: {
        category: true,
      },
    })
  })

  it("deve filtrar transações pelo mês informado", async () => {
    vi.spyOn(prismaClient.transaction, "findMany").mockResolvedValue([])
    vi.spyOn(prismaClient.transaction, "count").mockResolvedValue(0)

    const service = new TransactionService()

    await service.list("user-123", {
      page: 1,
      limit: 10,
      filters: {
        month: "2026-09",
      },
    })

    expect(prismaClient.transaction.findMany).toHaveBeenCalledWith({
      where: {
        userId: "user-123",
        date: {
          gte: new Date(2026, 8, 1),
          lte: new Date(2026, 9, 0, 23, 59, 59),
        },
      },
      skip: 0,
      take: 10,
      orderBy: {
        date: "desc",
      },
      include: {
        category: true,
      },
    })
  })

  it("deve filtrar transações pelo tipo informado", async () => {
        vi.spyOn(prismaClient.transaction, "findMany").mockResolvedValue([])
        vi.spyOn(prismaClient.transaction, "count").mockResolvedValue(0)

        const service = new TransactionService()

        await service.list("user-123", {
            page: 1,
            limit: 10,
            filters: {
            type: "EXPENSE",
            },
        })

        expect(prismaClient.transaction.findMany).toHaveBeenCalledWith({
            where: {
            userId: "user-123",
            type: "EXPENSE",
            },
            skip: 0,
            take: 10,
            orderBy: {
            date: "desc",
            },
            include: {
            category: true,
            },
        })
    })
})