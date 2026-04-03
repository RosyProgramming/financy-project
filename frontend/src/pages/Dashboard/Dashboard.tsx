import { Link } from "react-router-dom"
import { CategoriesRow } from "@/pages/Dashboard/components/CategoriesRow"
import { DashboardCard } from "@/pages/Dashboard/components/DashboardCard"
import { TransactionsRow } from "@/pages/Dashboard/components/TransactionsRow"
import { Wallet, CircleArrowUp, CircleArrowDown, Plus, ChevronRight, Briefcase } from "lucide-react"
import { iconMap, colorMap } from "@/constants/Category"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Page } from "@/components/Page"
import { CreateTransactionDialog } from "../Transaction/components/CreateTransactionDialog"
import { Button } from "@/components/ui/button"
import { useQuery } from "@apollo/client/react"
import { GET_RECENT_TRANSACTIONS, GET_DASHBOARD_SUMMARY, GET_DASHBOARD_CATEGORIES } from "@/lib/graphql/queries/Dashboard"
import type { Transaction, DashboardSummary, CategoryDashboard } from "@/types"

export function DashboardPage() {
    const [openDialog, setOpenDialog] = useState(false)

    //dashboard summary
    const {
        data: summaryData,
        loading: loadingSummary,
        refetch: refetchSummary
    } = useQuery<{ dashboardSummary: DashboardSummary }>(
        GET_DASHBOARD_SUMMARY,
        {
            fetchPolicy: "cache-and-network"
        }
    )
    
    const dashboardSummary = summaryData?.dashboardSummary ?? {
        totalAmount: 0,
        totalAmountIncome: 0,
        totalAmountExpense: 0
    }
    
    
    const formatCurrency = (value: number) => {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })
    }
    
    //dashboard recent transactions
    const {
        data: recentTransactionsData,
        loading: loadingRecentTransactions,
        refetch: refetchRecentTransactions
    } = useQuery<{ dashboardRecentTransactions: Transaction[] }>(
        GET_RECENT_TRANSACTIONS,
        {
            fetchPolicy: "cache-and-network"
        }
    )

    const recentTransactions = recentTransactionsData?.dashboardRecentTransactions ?? []

    //dashboard categories
    const {
        data: categoriesData,
        loading: loadingCategories,
        refetch: refetchCategories
    } = useQuery<{ dashboardCategories: CategoryDashboard[] }>(
        GET_DASHBOARD_CATEGORIES,
        {
            fetchPolicy: "cache-and-network"
        }
    )

    const categories = categoriesData?.dashboardCategories ?? []

  return (
    <Page>
    <div className="w-full flex flex-col gap-8">

        {/* 🔹 TOP CARDS */}
        <div className="grid grid-cols-3 gap-6 w-full">
            <DashboardCard title="Saldo total" value={loadingSummary ? "Carregando..." : formatCurrency(dashboardSummary.totalAmount)} icon={Wallet} iconClassName="text-purple-base"/>
            <DashboardCard title="Receitas do mês" value={loadingSummary ? "Carregando..." : formatCurrency(dashboardSummary.totalAmountIncome)} icon={CircleArrowUp} iconClassName="text-brand" />
            <DashboardCard title="Despesas do mês" value={loadingSummary ? "Carregando..." : formatCurrency(dashboardSummary.totalAmountExpense)} icon={CircleArrowDown} iconClassName="text-red-base" />
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="grid grid-cols-3 gap-6 w-full">

            {/* TRANSAÇÕES */}
            <Card className="col-span-2 border border-gray-200">
                <CardHeader className="flex flex-row justify-between items-center border-b px-6 py-5">
                    <CardTitle className="text-xs uppercase text-gray-500 font-medium">
                        Transações recentes
                    </CardTitle>
                    <Link 
                        to="/transactions"
                        className="flex items-center gap-1 text-sm text-brand font-medium hover:opacity-80">
                        Ver todas
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </CardHeader>

                <CardContent className="p-0">

                    {loadingRecentTransactions ? (
                        <div className="p-4 text-center text-gray-500">
                            Carregando transações...
                        </div>
                    ) : (
                        recentTransactions.map((transaction) => {
                            const Icon = iconMap[transaction.category?.icon as keyof typeof iconMap] || Briefcase
                            const categoryColor = colorMap[transaction.category?.color as keyof typeof colorMap] || colorMap.blue

                        return (
                            <TransactionsRow
                            key={transaction.id}
                            icon={Icon}
                            title={transaction.description}
                            date={new Intl.DateTimeFormat("pt-BR").format(new Date(transaction.date))}
                            category={transaction.category?.title}
                            value={formatCurrency(transaction.amount)}
                            positive={transaction.type === "INCOME"}
                            color={{
                                bg: categoryColor.icon.split(" ")[1], 
                                text: categoryColor.icon.split(" ")[0] 
                            }}
                            />
                        )
                    }))}
                </CardContent>

                <CardHeader className="flex justify-center items-center px-6 py-5 gap-2 h-[60px]">
                <Button onClick={() => setOpenDialog(true)}
                    className="flex items-center gap-1 text-sm font-medium text-brand hover:opacity-80">
                    <Plus className="w-5 h-5 text-brand" />
                    <span>Adicionar transação</span>
                </Button>
                </CardHeader>
            </Card>

            <CreateTransactionDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                onSuccess={() => {
                    refetchRecentTransactions()
                    refetchSummary()
                    refetchCategories()
                }}
            />
                
            {/* CATEGORIAS */}
            <Card className="border border-gray-200">
                <CardHeader className="flex flex-row justify-between items-center border-b px-6 py-5">
                    <CardTitle className="text-xs uppercase text-gray-500 font-medium">
                        Categorias
                    </CardTitle>
                    <Link 
                        to="/categories"
                        className="flex items-center gap-1 text-sm text-brand font-medium hover:opacity-80">
                        Gerenciar
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </CardHeader>

                <CardContent className="flex flex-col gap-5 px-6 py-6">
                    {loadingCategories ? (
                        <div className="text-center text-gray-500">
                            Carregando categorias...
                        </div>
                        ) : (
                        categories.map((cat) => {

                            const color = colorMap[cat.color as keyof typeof colorMap]

                            return (
                            <CategoriesRow
                                key={cat.title}
                                label={cat.title}
                                count={`${cat.count} itens`}
                                value={formatCurrency(cat.total)}
                                color={color?.tag ?? "bg-gray-100 text-gray-700"}
                            />
                            )
                        })
                    )}
                </CardContent>
            </Card>
        </div>

    </div>
    </Page>
  )
}