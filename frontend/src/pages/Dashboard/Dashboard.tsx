import { Link } from "react-router-dom"
import { CategoriesRow } from "@/pages/Dashboard/components/CategoriesRow"
import { DashboardCard } from "@/pages/Dashboard/components/DashboardCard"
import { TransactionsRow } from "@/pages/Dashboard/components/TransactionsRow"
import { Wallet, CircleArrowUp, CircleArrowDown, Plus, ChevronRight, Car, Utensils, Briefcase } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { useState } from "react"
import { Page } from "@/components/Page"
import { CreateTransactionDialog } from "../Transaction/components/CreateTransactionDialog"
import { Button } from "@/components/ui/button"

export function DashboardPage() {
    const [openDialog, setOpenDialog] = useState(false)

  return (
    <Page>
    <div className="w-full flex flex-col gap-8">

        {/* 🔹 TOP CARDS */}
        <div className="grid grid-cols-3 gap-6 w-full">
            <DashboardCard title="Saldo total" value="R$ 12.847,32" icon={Wallet} iconClassName="text-purple-base"/>
            <DashboardCard title="Receitas do mês" value="R$ 4.250,00" icon={CircleArrowUp} iconClassName="text-brand" />
            <DashboardCard title="Despesas do mês" value="R$ 2.180,45" icon={CircleArrowDown} iconClassName="text-red-base" />
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
                    <TransactionsRow
                        icon={Briefcase}
                        title="Pagamento de Salário"
                        date="01/12/2025"
                        category="Salário"
                        value="+ R$ 4.250,00"
                        positive
                        color={{ bg: "bg-green-100", text: "text-green-600" }}
                    />

                    <TransactionsRow
                        icon={Utensils}
                        title="Jantar no Restaurante"
                        date="30/11/2025"
                        category="Alimentação"
                        value="- R$ 89,50"
                        positive={false}
                        color={{ bg: "bg-blue-100", text: "text-blue-600" }}
                    />

                    <TransactionsRow
                        icon={Car}
                        title="Posto de Gasolina"
                        date="29/11/2025"
                        category="Transporte"
                        value="- R$ 100,00"
                        positive={false}
                        color={{ bg: "bg-purple-100", text: "text-purple-600" }}
                    />
                </CardContent>

                <CardHeader className="flex justify-center items-center px-6 py-5 gap-2 h-[60px]">
                <Button onClick={() => setOpenDialog(true)}
                    className="flex items-center gap-1 text-sm font-medium text-brand hover:opacity-80">
                    <Plus className="w-5 h-5 text-brand" />
                    <span>Adicionar transação</span>
                </Button>
                </CardHeader>
            </Card>

            <CreateTransactionDialog open={openDialog} onOpenChange={setOpenDialog} onSuccess={() => {}} />
                
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
                    <CategoriesRow
                        label="Alimentação"
                        count="12 itens"
                        value="R$ 542,30"
                        color="bg-blue-100 text-blue-700"
                    />

                    <CategoriesRow
                        label="Transporte"
                        count="8 itens"
                        value="R$ 385,50"
                        color="bg-purple-100 text-purple-700"
                    />
                </CardContent>
            </Card>
        </div>

    </div>
    </Page>
  )
}