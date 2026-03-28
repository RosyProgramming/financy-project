import { useState } from "react"
import { Plus, Search, Trash2, SquarePen, ChevronLeft, ChevronRight, CircleArrowDown, CircleArrowUp } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Page } from "@/components/Page"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


// — tipos
interface Transaction {
    id: string
    description: string
    date: string
    categoryId: string
    categoryName: string
    type: "entrada" | "saida"
    amount: number
}

// — mapa de cores por categoria
const categoryColorMap: Record<string, { bg: string; icon: string; tag: string; tagText: string }> = {
    alimentacao:    { bg: "bg-blue-light",   icon: "text-blue-base",   tag: "bg-blue-light",   tagText: "text-blue-dark" },
    transporte:     { bg: "bg-purple-light", icon: "text-purple-base", tag: "bg-purple-light", tagText: "text-purple-dark" },
    mercado:        { bg: "bg-orange-light", icon: "text-orange-base", tag: "bg-orange-light", tagText: "text-orange-dark" },
    investimento:   { bg: "bg-green-light",  icon: "text-green-base",  tag: "bg-green-light",  tagText: "text-green-dark" },
    utilidades:     { bg: "bg-yellow-light", icon: "text-yellow-base", tag: "bg-yellow-light", tagText: "text-yellow-dark" },
    salario:        { bg: "bg-green-light",  icon: "text-green-base",  tag: "bg-green-light",  tagText: "text-green-dark" },
    entretenimento: { bg: "bg-pink-light",   icon: "text-pink-base",   tag: "bg-pink-light",   tagText: "text-pink-dark" },
}

const categoryIcons: Record<string, React.ReactNode> = {
    alimentacao:    <span>🍴</span>,
    transporte:     <span>🚗</span>,
    mercado:        <span>🛒</span>,
    investimento:   <span>🐷</span>,
    utilidades:     <span>🧰</span>,
    salario:        <span>💼</span>,
    entretenimento: <span>🎟</span>,
}

// — dados mock (substituir por useQuery futuramente)
const mockTransactions: Transaction[] = [
    { id: "1", description: "Jantar no Restaurante",   date: "30/11/25", categoryId: "alimentacao",    categoryName: "Alimentação",    type: "saida",   amount: 89.50 },
    { id: "2", description: "Posto de Gasolina",       date: "29/11/25", categoryId: "transporte",     categoryName: "Transporte",     type: "saida",   amount: 100.00 },
    { id: "3", description: "Compras no Mercado",      date: "28/11/25", categoryId: "mercado",        categoryName: "Mercado",        type: "saida",   amount: 156.80 },
    { id: "4", description: "Retorno de Investimento", date: "26/11/25", categoryId: "investimento",   categoryName: "Investimento",   type: "entrada", amount: 340.25 },
    { id: "5", description: "Aluguel",                 date: "26/11/25", categoryId: "utilidades",     categoryName: "Utilidades",     type: "saida",   amount: 1700.00 },
    { id: "6", description: "Freelance",               date: "24/11/25", categoryId: "salario",        categoryName: "Salário",        type: "entrada", amount: 2500.00 },
    { id: "7", description: "Compras Jantar",          date: "22/11/25", categoryId: "mercado",        categoryName: "Mercado",        type: "saida",   amount: 150.00 },
    { id: "8", description: "Cinema",                  date: "18/12/25", categoryId: "entretenimento", categoryName: "Entretenimento", type: "saida",   amount: 88.00 },
]

function formatAmount(amount: number, type: "entrada" | "saida") {
    const formatted = amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
    return type === "entrada" ? `+ ${formatted}` : `- ${formatted}`
}

export function TransactionsPage() {
    const [search, setSearch]           = useState("")
    const [tipo, setTipo]               = useState("")
    const [categoria, setCategoria]     = useState("")
    const [periodo, setPeriodo]         = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const totalResults = 27
    const totalPages   = 3

    // substituir por useQuery quando integrar com backend
    const transactions = mockTransactions

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

                    <Button className="flex items-center gap-2 px-3 py-2 h-9 bg-brand rounded-lg text-sm font-medium text-white hover:bg-brand-dark transition-colors">
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
                                className="w-full h-12 pl-9 pr-3 py-3.5 border border-gray-300 rounded-lg bg-white placeholder:text-gray-400 text-base font-normal font-sans focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Tipo */}
                    <div className="flex flex-col gap-2 flex-1">
                        <Label className="text-sm font-medium leading-5 text-gray-700 font-sans">
                            Tipo
                        </Label>
                        <Select onValueChange={setTipo} value={tipo}>
                            <SelectTrigger className={`w-full h-12 px-3 py-3.5 border border-gray-300 rounded-lg text-base font-normal font-sans focus:ring-0 ${tipo ? "text-gray-800" : "text-gray-400"}`}>
                                <SelectValue placeholder="Todos" />
                            </SelectTrigger>
                            <SelectContent position="popper" side="bottom" sideOffset={8}
                                className="w-[var(--radix-select-trigger-width)] bg-white border border-gray-300 rounded-lg shadow-[0px_4px_15px_rgba(0,0,0,0.1)] [&_[data-state=checked]_svg]:text-brand [&_[data-state=checked]_svg]:stroke-brand">
                                <SelectGroup>
                                    <SelectItem value="todos"   className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Todos</SelectItem>
                                    <SelectItem value="entrada" className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Entrada</SelectItem>
                                    <SelectItem value="saida"   className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Saída</SelectItem>
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
                            <SelectTrigger className={`w-full h-12 px-3 py-3.5 border border-gray-300 rounded-lg text-base font-normal font-sans focus:ring-0 ${categoria ? "text-gray-800" : "text-gray-400"}`}>
                                <SelectValue placeholder="Todas" />
                            </SelectTrigger>
                            <SelectContent position="popper" side="bottom" sideOffset={8}
                                className="w-[var(--radix-select-trigger-width)] bg-white border border-gray-300 rounded-lg shadow-[0px_4px_15px_rgba(0,0,0,0.1)] [&_[data-state=checked]_svg]:text-brand [&_[data-state=checked]_svg]:stroke-brand">
                                <SelectGroup>
                                    <SelectItem value="todas"          className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Todas</SelectItem>
                                    <SelectItem value="alimentacao"    className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Alimentação</SelectItem>
                                    <SelectItem value="transporte"     className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Transporte</SelectItem>
                                    <SelectItem value="mercado"        className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Mercado</SelectItem>
                                    <SelectItem value="investimento"   className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Investimento</SelectItem>
                                    <SelectItem value="utilidades"     className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Utilidades</SelectItem>
                                    <SelectItem value="salario"        className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Salário</SelectItem>
                                    <SelectItem value="entretenimento" className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Entretenimento</SelectItem>
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
                            <SelectTrigger className={`w-full h-12 px-3 py-3.5 border border-gray-300 rounded-lg text-base font-normal font-sans focus:ring-0 ${periodo ? "text-gray-800" : "text-gray-400"}`}>
                                <SelectValue placeholder="Novembro / 2025" />
                            </SelectTrigger>
                            <SelectContent position="popper" side="bottom" sideOffset={8}
                                className="w-[var(--radix-select-trigger-width)] bg-white border border-gray-300 rounded-lg shadow-[0px_4px_15px_rgba(0,0,0,0.1)] [&_[data-state=checked]_svg]:text-brand [&_[data-state=checked]_svg]:stroke-brand">
                                <SelectGroup>
                                    <SelectItem value="2025-11" className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Novembro / 2025</SelectItem>
                                    <SelectItem value="2025-10" className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Outubro / 2025</SelectItem>
                                    <SelectItem value="2025-09" className="text-base text-gray-800 font-sans data-[state=checked]:font-medium focus:bg-transparent">Setembro / 2025</SelectItem>
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
                        {transactions.map((tx) => {
                            const color = categoryColorMap[tx.categoryId] ?? {
                                bg: "bg-gray-200", icon: "text-gray-500", tag: "bg-gray-200", tagText: "text-gray-700"
                            }

                            return (
                                <TableRow key={tx.id} className="h-[72px] border-b border-gray-200 hover:bg-transparent last:border-b-0">

                                    {/* Descrição */}
                                    <TableCell className="px-6">
                                        <div className="flex flex-row items-center gap-4">
                                            <div className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${color.bg}`}>
                                                <span className={`text-base ${color.icon}`}>
                                                    {categoryIcons[tx.categoryId] ?? <span>•</span>}
                                                </span>
                                            </div>
                                            <span className="text-base font-medium leading-6 text-gray-800 font-sans">
                                                {tx.description}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* Data */}
                                    <TableCell className="px-6 text-sm font-normal leading-5 text-gray-600 font-sans text-center">
                                        {tx.date}
                                    </TableCell>

                                    {/* Categoria */}
                                    <TableCell className="px-6 text-center">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium font-sans ${color.tag} ${color.tagText}`}>
                                            {tx.categoryName}
                                        </span>
                                    </TableCell>

                                    {/* Tipo */}
                                    <TableCell className="px-6">
                                        <div className="flex flex-row items-center justify-center gap-2">
                                            {tx.type === "entrada" ? (
                                                <>
                                                    <CircleArrowUp className="w-4 h-4 text-green-base" />
                                                    <span className="text-sm font-medium leading-5 text-green-dark font-sans">Entrada</span>
                                                </>
                                            ) : (
                                                <>
                                                    <CircleArrowDown className="w-4 h-4 text-red-base" />
                                                    <span className="text-sm font-medium leading-5 text-red-dark font-sans">Saída</span>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>

                                    {/* Valor */}
                                    <TableCell className="px-6 text-sm font-semibold leading-5 text-gray-800 font-sans text-right">
                                        {formatAmount(tx.amount, tx.type)}
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
                        1 a 10 | {totalResults} resultados
                    </span>
                    <div className="flex flex-row items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
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
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            className="w-8 h-8 border-gray-300 hover:border-gray-400 hover:bg-white"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-700" />
                        </Button>
                    </div>
                </div>

            </div>
            </div>
        </Page>
    )
}