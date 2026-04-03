import { prismaClient } from "../../prisma/prisma"

export class DashboardService {

    async getSummary(userId: string) {
        const [totalAmount, totalAmountIncome, totalAmountExpense] = await Promise.all([
            prismaClient.transaction.aggregate({
                where: { userId },
                _sum: { amount: true }
            }),
            prismaClient.transaction.aggregate({
                where: { userId, type: "INCOME" },
                _sum: { amount: true }
            }),
            prismaClient.transaction.aggregate({
                where: { userId, type: "EXPENSE" },
                _sum: { amount: true }
            })
        ])

        return {
            totalAmount: totalAmount._sum.amount ?? 0,
            totalAmountIncome: totalAmountIncome._sum.amount ?? 0,
            totalAmountExpense: totalAmountExpense._sum.amount ?? 0,
        }
    }

    async getRecentTransactions(userId: string) {
        return prismaClient.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 5,
            include: {
                category: true
            }
        })
    }

    async getTransactionsByCategory(userId: string) {
        const result = await prismaClient.transaction.groupBy({
            by: ['categoryId'],
            where: { userId },
            _sum: { amount: true },
            _count: { id: true },

           orderBy: [
                {
                    _count: {
                    id: 'desc'
                    }
                },
                {
                    _sum: {
                    amount: 'desc'
                    }
                }
            ],
            
            take: 5 
        })

        const categories = await prismaClient.category.findMany({
            where: {
            id: { in: result.map(r => r.categoryId) }
            }
        })

        return result.map(r => {
            const category = categories.find(c => c.id === r.categoryId)

            return {
            categoryId: r.categoryId,
            title: category?.title ?? "Sem categoria",
            icon: category?.icon,
            color: category?.color,
            total: r._sum.amount ?? 0,
            count: r._count.id
            }
        })
    }
}