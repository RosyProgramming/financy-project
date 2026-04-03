import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "../../../components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CheckCircle, ChevronDown, CircleArrowDown, CircleArrowUp, TriangleAlert } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { toast } from "sonner"
import type { Category, Transaction } from "@/types"
import { useMutation, useQuery } from "@apollo/client/react"
import {  UPDATE_TRANSACTION } from "@/lib/graphql/mutations/Transactions"
import {  useState } from "react"
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transactions"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Categories"


interface EditTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  transaction: Transaction
}

export function EditTransactionDialog({
  open,
  onOpenChange,
  onSuccess,
  transaction,
}: EditTransactionDialogProps) {

    const [description, setDescription] = useState(transaction.description)
    const [amount, setAmount] = useState<string>(
        transaction.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    )
    const [date, setDate] = useState<Date | undefined>(new Date(transaction.date))
    const [type, setType] = useState<"EXPENSE" | "INCOME">(transaction.type)
    const [categoria, setCategoria] = useState(transaction.categoryId)

    //  categorias
    const { data: categoriesData } = useQuery<{ categories: Category[] }>(LIST_CATEGORIES)

    const categories = categoriesData?.categories || []

    //converte amount
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, "")

        const value = (Number(digits) / 100).toFixed(2)

        const formatted = Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        })

        setAmount(digits === "" ? "" : formatted)
    }

    const parseAmount = (value: string) => {
        return (
        parseFloat(value.replace(/[R$\s.]/g, "").replace(",", ".")) || 0
        )
    }

    const [updateTransaction, { loading }] = useMutation(UPDATE_TRANSACTION, {
        onCompleted: () => {
          onSuccess()
        },
        refetchQueries: [LIST_TRANSACTIONS]
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const amountDecimal = parseAmount(amount)

        if (!description || !amount || !date || !categoria) {
        toast.warning("Preencha todos os campos", {
            icon: <TriangleAlert className="text-danger w-5 h-5" />
        })
        return
        }

        try {
          await updateTransaction({
              variables: {
              id: transaction.id, 
              data: {
                  description,
                  amount: amountDecimal,
                  date,
                  type,
                  categoryId: categoria,
              }
              }
          })
          
          toast.success("Transação atualizada com sucesso", {
              icon: <CheckCircle className="text-success w-5 h-5" />
          })
          
          onOpenChange(false)

        } catch (error: any) {
          const message = error?.graphQLErrors?.[0]?.message || error?.message || "Erro ao atualizar transação"
          toast.error(message, {
              icon: <CheckCircle className="text-danger w-5 h-5" />
          })
        }
    }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[448px] p-6 flex flex-col gap-6 bg-white border border-gray-200 rounded-xl">

        {/* Header */}
        <DialogHeader className="flex flex-row items-start gap-4 w-full">
          <div className="flex flex-col gap-1 flex-1">
            <DialogTitle className="text-base font-semibold leading-6 text-gray-800">
              Editar transação
            </DialogTitle>
            <DialogDescription className="text-sm leading-5 text-gray-600">
              Edite sua despesa ou receita
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Toggle */}
        <div className="flex w-full p-2 border border-gray-200 rounded-xl">
          <Button
            type="button"
            onClick={() => setType("EXPENSE")}
            className={`flex-1 h-[46px] flex items-center justify-center gap-2 rounded-lg text-base transition
              ${type === "EXPENSE"
                  ? "bg-gray-100 border border-red-base text-gray-800"
                  : "bg-transparent border-transparent text-gray-600"
              }`}
          >
            <CircleArrowDown
              className={`w-4 h-4 ${
                type === "EXPENSE" ? "text-red-base" : "text-gray-400"
              }`}
            />
            Despesa
          </Button>

          <Button
            type="button"
            onClick={() => setType("INCOME")}
            className={`flex flex-row justify-center items-center px-3 py-3.5 gap-3 flex-1 h-[46px] rounded-lg font-sans text-base transition-all
                ${type === "INCOME"
                    ? "bg-gray-100 border border-green-base"
                    : "bg-transparent border-transparent shadow-none"
              }`}>
              <CircleArrowUp className={`w-4 h-4 ${type === "INCOME" ? "text-green-base" : "text-gray-400"}`} />
              <span className={type === "INCOME" ? "text-gray-800 font-medium" : "text-gray-600 font-normal"}>
                Receita
              </span>
          </Button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4 w-full">

          {/* Descrição */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-gray-700">
              Descrição
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="Ex. Almoço no restaurante"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-12"
            />
          </div>

          {/* Data + Valor */}
          <div className="flex gap-4">
            {/* Data */}
            <div className="flex flex-col gap-2 flex-1">
              <Label className="text-sm font-medium text-gray-700">
                Data
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className=" h-12 px-3 py-3.5 justify-between border border-gray-300 rounded-lg bg-white text-base font-normal text-gray-800 data-[empty=true]:text-gray-400"
                  >
                    {date ? format(date, "dd/MM/yyyy") : "Selecione"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    defaultMonth={date}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Valor */}
            <div className="flex flex-col gap-2 flex-1">
              <Label className="text-sm font-medium text-gray-700">
                Valor
              </Label>
              <Input
                placeholder="R$ 0,00"
                value={amount}
                onChange={handleAmountChange}
                inputMode="numeric"
                className="h-12"
              />
            </div>
          </div>

          {/* Categoria */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-gray-700">
              Categoria
            </Label>
                <Select onValueChange={setCategoria} value={categoria}>
              <SelectTrigger className={`w-full h-12 px-3 py-3.5 border border-gray-300 rounded-lg text-base font-normal font-sans ${categoria ? "text-gray-800" : "text-gray-400"}`}>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="[&_[data-state=checked]_svg]:text-brand [&_[data-state=checked]_svg]:stroke-brand">
                  <SelectGroup className="bg-white">
                  <SelectLabel>Categorias</SelectLabel>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.title}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Botão */}
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="h-12  px-4 py-3 gap-2 bg-brand hover:bg-brand-dark text-white text-base font-medium"
          >
            Salvar
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  )
}