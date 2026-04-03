import { useEffect, useState } from "react"
import { Plus, Search, Trash2, SquarePen, ChevronLeft, ChevronRight, CircleArrowDown, CircleArrowUp } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Page } from "@/components/Page"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateTransactionDialog } from "./components/CreateTransactionDialog"
import { GET_TRANSACTION_MONTHS, LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transactions"
import { useQuery } from "@apollo/client/react"
import type { Category, Transaction, TransactionMonthFilter } from "@/types"
import { colorMap, iconMap } from "@/constants/Category"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Categories"

// — tipos
// INCOME → Receita / Entrada
// EXPENSE → Despesa / Saída

interface TransactionsResponse {
  transactions: {
    data: Transaction[]
    meta: {
      total: number
      page: number
      lastPage: number
    }
  }
}


export function TransactionsPage() {
    const [search, setSearch]           = useState("")
    const [tipo, setTipo]               = useState("")
    const [categoria, setCategoria]     = useState("")
    const [periodo, setPeriodo]         = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [openDialog, setOpenDialog]   = useState(false)
    const [debouncedSearch, setDebouncedSearch] = useState("")

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(1)
            setDebouncedSearch(search)
        }, 500)
        return () => clearTimeout(timer)
    }, [search, tipo, categoria, periodo])
    
    const { data: categoriesData } = useQuery<{ categories: Category[] }>(LIST_CATEGORIES)
    const categories = categoriesData?.categories || []

    const { data: transactionData, loading: loadingList } = useQuery<TransactionsResponse>(
        LIST_TRANSACTIONS,
        {
            fetchPolicy: "network-only",
            variables: {
                page: currentPage,
                limit: 10,
                filters: {
                    search: debouncedSearch || undefined,
                    categoryId: categoria && categoria !== "todas" ? categoria : undefined,
                    type: tipo && tipo !== "todos" ? tipo : undefined,
                    month: periodo && periodo !== "todos" ? periodo : undefined,
                }
            }
        }
    )

    const transactions = transactionData?.transactions.data ?? []
    const totalResults = transactionData?.transactions.meta.total ?? 0
    const totalPages   = transactionData?.transactions.meta.lastPage ?? 1

    const start = totalResults === 0 ? 0 : (currentPage - 1) * 10 + 1
    const end   = Math.min(currentPage * 10, totalResults)
    
    const { data: monthsData, loading: monthsLoading } = useQuery<{ transactionMonths: TransactionMonthFilter[] }>(GET_TRANSACTION_MONTHS)
    const transactionMonthData = (monthsData?.transactionMonths ?? []).filter(m => !m.value.startsWith("1969"))

    return (
        <Page>
            <div className="flex flex-col gap-8 w-full">

                {/* Header */}
                <Card className="flex flex-row justify-between items-center w-full h-[58px] ring-0 py-0">
                    <CardHeader className="flex flex-col gap-0.5 flex-1 px-0">
                        <CardTitle className="text-2xl font-bold leading-8 text-gray-800 font-sans">
                            Transações
                        </CardTitle>
                        <CardDescription className="text-base font-normal leading-6 text-gray-600 font-sans">
                            Gerencie todas as suas transações financeiras
                        </CardDescription>
                    </CardHeader>

                    <Button 
                        onClick={() => setOpenDialog(true)}
                        className="flex items-center gap-2 px-3 py-2 h-9 bg-brand rounded-lg text-sm font-medium text-white hover:bg-brand-dark transition-colors">
                        <Plus className="w-4 h-4" />
                        Nova transação
                    </Button>
                </Card>

                {/* Filtros */}
                <div className="flex flex-row items-start px-6 py-5 gap-4 w-full bg-white border border-gray-200 rounded-xl">

                    {/* Buscar */}
                    <div className="flex flex-col gap-2 flex-1">
                        <Label className="text-sm font-medium leading-5 text-gray-700 font-sans">
                            Buscar
                        </Label>
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Buscar por descrição"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-8 pl-9 pr-3 border border-gray-300 rounded-lg bg-white placeholder:text-gray-400 text-base font-normal font-sans focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Tipo */}
                    <div className="flex flex-col gap-2 flex-1">
                        <Label className="text-sm font-medium leading-5 text-gray-700 font-sans">
                            Tipo
                        </Label>
                        <Select onValueChange={setTipo} value={tipo}>
                            <SelectTrigger className={`w-full pr-3 py-3.5 border border-gray-300 rounded-lg text-base font-normal font-sans focus:ring-0 ${tipo ? "text-gray-800" : "text-gray-400"}`}>
                                <SelectValue placeholder="Todos" />
                            </SelectTrigger>
                            <SelectContent position="popper" side="bottom" sideOffset={8}
                                className="w-[var(--radix-select-trigger-width)] bg-white border border-gray-300 rounded-lg shadow-[0px_4px_15px_rgba(0,0,0,0.1)] [&_[data-state=checked]_svg]:text-brand [&_[data-state=checked]_svg]:stroke-brand">
                                <SelectGroup>
                                    <SelectItem value="todos"   className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Todos</SelectItem>
                                    <SelectItem value="INCOME" className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Entrada</SelectItem>
                                    <SelectItem value="EXPENSE"   className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Saída</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Categoria */}
                    <div className="flex flex-col gap-2 flex-1">
                        <Label className="text-sm font-medium leading-5 text-gray-700 font-sans">
                            Categoria
                        </Label>
                        <Select onValueChange={setCategoria} value={categoria}>
                            <SelectTrigger className={`w-full pr-3 py-3.5 border border-gray-300 rounded-lg text-base font-normal font-sans focus:ring-0 ${categoria ? "text-gray-800" : "text-gray-400"}`}>
                                <SelectValue placeholder="Todas" />
                            </SelectTrigger>
                            <SelectContent position="popper" side="bottom" sideOffset={8}
                                className="w-[var(--radix-select-trigger-width)] bg-white border border-gray-300 rounded-lg shadow-[0px_4px_15px_rgba(0,0,0,0.1)] [&_[data-state=checked]_svg]:text-brand [&_[data-state=checked]_svg]:stroke-brand">
                                <SelectGroup>
                                    <SelectItem value="todas"          className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Todas</SelectItem>
                                    {categories.map((category) => (
                                    <SelectItem  key={category.id} value={category.id} className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">
                                        {category.title}
                                    </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Período */}
                    <div className="flex flex-col gap-2 flex-1">
                        <Label className="text-sm font-medium leading-5 text-gray-700 font-sans">
                            Período
                        </Label>
                        <Select onValueChange={setPeriodo} value={periodo}>
                            <SelectTrigger className={`w-full pr-3 py-3.5 border border-gray-300 rounded-lg text-base font-normal font-sans focus:ring-0 ${periodo ? "text-gray-800" : "text-gray-400"}`}>
                                <SelectValue placeholder="Novembro / 2025" />
                            </SelectTrigger>
                            <SelectContent position="popper" side="bottom" sideOffset={8}
                                className="w-[var(--radix-select-trigger-width)] bg-white border border-gray-300 rounded-lg shadow-[0px_4px_15px_rgba(0,0,0,0.1)] [&_[data-state=checked]_svg]:text-brand [&_[data-state=checked]_svg]:stroke-brand">
                                <SelectGroup>
                                    <SelectItem
                                        key="todos"
                                        value="todos"
                                        className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent"
                                    >
                                        Todos
                                    </SelectItem>
                                    {monthsLoading ? (
                                    <SelectItem value="loading" disabled>
                                        Carregando...
                                    </SelectItem>
                                    ) : transactionMonthData.length ? (
                                    transactionMonthData.map((month) => (
                                        <SelectItem
                                            key={month.value}
                                            value={month.value}
                                            className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent"
                                        >
                                        {month.label}
                                        </SelectItem>
                                    ))
                                    ) : (
                                    <SelectItem value="empty" disabled>
                                        Nenhum período encontrado
                                    </SelectItem>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Tabela */}
               <div className="flex flex-col w-full bg-white border border-gray-200 rounded-xl overflow-hidden">

                    <Table>
                        {/* Cabeçalho */}
                        <TableHeader>
                            <TableRow className="border-b border-gray-200 hover:bg-transparent">
                                <TableHead className="px-6 py-5 text-xs font-medium tracking-[0.6px] uppercase text-gray-500 font-sans">
                                    Descrição
                                </TableHead>
                                <TableHead className="px-6 py-5 text-xs font-medium tracking-[0.6px] uppercase text-gray-500 font-sans text-center w-[112px]">
                                    Data
                                </TableHead>
                                <TableHead className="px-6 py-5 text-xs font-medium tracking-[0.6px] uppercase text-gray-500 font-sans text-center w-[200px]">
                                    Categoria
                                </TableHead>
                                <TableHead className="px-6 py-5 text-xs font-medium tracking-[0.6px] uppercase text-gray-500 font-sans text-center w-[136px]">
                                    Tipo
                                </TableHead>
                                <TableHead className="px-6 py-5 text-xs font-medium tracking-[0.6px] uppercase text-gray-500 font-sans text-right w-[200px]">
                                    Valor
                                </TableHead>
                                <TableHead className="px-6 py-5 text-xs font-medium tracking-[0.6px] uppercase text-gray-500 font-sans text-right w-[120px]">
                                    Ações
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        {/* Linhas dinâmicas */}
                        <TableBody>
                            {!loadingList && transactions.map((tx) => {
                                const color = colorMap[tx.category?.color as keyof typeof colorMap] ?? colorMap.blue
                                const Icon = iconMap[tx.category?.icon as keyof typeof iconMap] ?? null
                                const isIncome = tx.type === "INCOME"

                                return (
                                    <TableRow key={tx.id} className="h-[72px] border-b border-gray-200 hover:bg-transparent last:border-b-0">

                                        {/* Descrição */}
                                        <TableCell className="px-6">
                                            <div className="flex flex-row items-center gap-4">
                                                <div className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${color.icon}`}>
                                                    {Icon && <Icon className="w-4 h-4" />}
                                                </div>
                                                <span className="text-base font-medium leading-6 text-gray-800 font-sans">
                                                    {tx.description}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Data */}
                                        <TableCell className="px-6 text-sm font-normal leading-5 text-gray-600 font-sans text-center">
                                            {new Intl.DateTimeFormat("pt-BR").format(new Date(tx.date))}
                                        </TableCell>

                                        {/* Categoria */}
                                        <TableCell className="px-6 text-center">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium font-sans ${color.tag}`}>
                                                {tx.category?.title}
                                            </span>
                                        </TableCell>

                                        {/* Tipo */}
                                        <TableCell className="px-6">
                                            <div className="flex flex-row items-center justify-center gap-2">
                                                {isIncome ? (
                                                    <>
                                                    <CircleArrowUp className="w-4 h-4 text-green-base" />
                                                    <span className="text-sm font-medium leading-5 text-green-dark font-sans">
                                                        Entrada
                                                    </span>
                                                    </>
                                                ) : (
                                                    <>
                                                    <CircleArrowDown className="w-4 h-4 text-red-base" />
                                                    <span className="text-sm font-medium leading-5 text-red-dark font-sans">
                                                        Saída
                                                    </span>
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>

                                        {/* Valor */}
                                        <TableCell className="px-6 text-sm font-semibold leading-5 text-gray-800 font-sans text-right">
                                            {isIncome ? "+" : "-"}{" "}
                                                {tx.amount.toLocaleString("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                            })}
                                        </TableCell>

                                        {/* Ações */}
                                        <TableCell className="px-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="w-8 h-8 border-gray-300 hover:border-danger hover:bg-white"
                                                >
                                                    <Trash2 className="w-4 h-4 text-danger" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="w-8 h-8 border-gray-300 hover:border-gray-400 hover:bg-white"
                                                >
                                                    <SquarePen className="w-4 h-4 text-gray-700" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>

                    {/* Footer / Paginação */}
                    <div className="flex flex-row justify-between items-center px-6 py-5 w-full h-[72px] border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-700 font-sans">
                           {start} a {end} | {totalResults} resultados
                        </span>
                        <div className="flex flex-row items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                className="w-8 h-8 border-gray-300 opacity-50 hover:opacity-100 hover:bg-white"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-700" />
                            </Button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    size="icon"
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 rounded-lg text-sm font-medium font-sans transition-colors
                                        ${currentPage === page
                                            ? "bg-brand text-white hover:bg-brand-dark"
                                            : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-white"
                                        }`}
                                >
                                    {page}
                                </Button>
                            ))}
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                className="w-8 h-8 border-gray-300 hover:border-gray-400 hover:bg-white"
                            >
                                <ChevronRight className="w-4 h-4 text-gray-700" />
                            </Button>
                        </div>
                    </div>
        
                </div>
            </div>

                <CreateTransactionDialog 
                    open={openDialog} 
                    onOpenChange={setOpenDialog} 
                    onSuccess={() => {}} 
                />
        </Page>
    )
}