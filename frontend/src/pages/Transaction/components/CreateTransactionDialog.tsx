import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "../../../components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ChevronDown, CircleArrowDown, CircleArrowUp } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { format } from "date-fns"

interface CreateTransactionDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
}

export function CreateTransactionDialog({
    open,
    onOpenChange,
    onSuccess
}: CreateTransactionDialogProps) {

    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState<string>("")
    const [date, setDate] = useState<Date | undefined>()
    const [type, setType] = useState<"despesa" | "receita">("despesa")
    const [categoria, setCategoria] = useState("")

    function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        // Remove tudo que não for dígito
        const digits = e.target.value.replace(/\D/g, "")
        
        // Converte para centavos e formata como moeda
        const value = (Number(digits) / 100).toFixed(2)
        
        // Formata para exibição: R$ 1.234,56
        const formatted = Number(value).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })
        
        setAmount(digits === "" ? "" : formatted)
    }

    // Para enviar ao backend, converte de volta para Decimal
    const amountDecimal = amount? parseFloat(amount.replace(/[R$\s.]/g, "").replace(",", ".")): 0;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col items-start p-6 gap-6 w-[448px] bg-white border border-gray-200 rounded-xl">

                {/* Header */}
                <DialogHeader className="flex flex-row items-start gap-4 w-full h-[46px] p-0">
                    <div className="flex flex-col justify-center items-center gap-0.5 flex-1 p-0">
                        <DialogTitle className="w-full text-base font-semibold leading-6 text-gray-800 font-sans">
                            Nova transação
                        </DialogTitle>
                        <DialogDescription className="w-full text-sm font-normal leading-5 text-gray-600 font-sans">
                            Registre sua despesa ou receita
                        </DialogDescription>
                    </div>
                </DialogHeader>

                {/* Toggle Despesa / Receita */}
                <div className="flex flex-row items-start p-2 gap-0 w-full border border-gray-200 rounded-xl">
                    <Button
                        type="button"
                        onClick={() => setType("despesa")}
                        className={`flex flex-row justify-center items-center px-3 py-3.5 gap-3 flex-1 h-[46px] rounded-lg font-sans text-base font-medium text-gray-800 transition-all
                            ${type === "despesa"
                                ? "bg-gray-100 border border-red-base"
                                : "bg-transparent border-transparent shadow-none"
                            }`}
                    >
                        <CircleArrowDown className={`w-4 h-4 ${type === "despesa" ? "text-red-base" : "text-gray-400"}`} />
                        <span className={type === "despesa" ? "text-gray-800 font-medium" : "text-gray-600 font-normal"}>
                            Despesa
                        </span>
                    </Button>

                    <Button
                        type="button"
                        onClick={() => setType("receita")}
                        className={`flex flex-row justify-center items-center px-3 py-3.5 gap-3 flex-1 h-[46px] rounded-lg font-sans text-base transition-all
                            ${type === "receita"
                                ? "bg-gray-100 border border-green-base"
                                : "bg-transparent border-transparent shadow-none"
                            }`}
                    >
                        <CircleArrowUp className={`w-4 h-4 ${type === "receita" ? "text-green-base" : "text-gray-400"}`} />
                        <span className={type === "receita" ? "text-gray-800 font-medium" : "text-gray-600 font-normal"}>
                            Receita
                        </span>
                    </Button>
                </div>

                {/* Form */}
                <div className="flex flex-col items-start gap-4 w-full">

                    {/* Descrição */}
                    <div className="flex flex-col items-start gap-2 w-full">
                        <Label className="w-full text-sm font-medium leading-5 text-gray-700 font-sans">
                            Descrição
                        </Label>
                        <Input
                            id="description"
                            type="text"
                            placeholder="Ex. Almoço no restaurante"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-12 px-3 py-3.5 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 text-base font-normal focus:outline-none"
                        />
                    </div>

                    {/* Data + Valor (linha) */}
                    <div className="flex flex-row items-start gap-4 w-full">

                        {/* Data */}
                        <div className="flex flex-col items-start gap-2 flex-1">
                            <Label className="w-full text-sm font-medium leading-5 text-gray-700 font-sans">
                                Data
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        data-empty={!date}
                                        className="w-full h-12 px-3 py-3.5 justify-between border border-gray-300 rounded-lg bg-white text-base font-normal text-gray-800 data-[empty=true]:text-gray-400"
                                    >
                                        {date ? format(date, "dd/MM/yyyy") : <span>Selecione</span>}
                                        <ChevronDown className="w-4 h-4 text-gray-700" />
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
                        <div className="flex flex-col items-start gap-2 flex-1">
                            <Label className="w-full text-sm font-medium leading-5 text-gray-700 font-sans">
                                Valor
                            </Label>
                            <Input
                                id="amount"
                                type="text"
                                inputMode="numeric"
                                placeholder="R$ 0,00"
                                value={amount}
                                onChange={handleAmountChange}
                                className="w-full h-12 px-3 py-3.5 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 text-base font-normal focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Categoria */}
                    <div className="flex flex-col items-start gap-2 w-full">
                        <Label className="w-full text-sm font-medium leading-5 text-gray-700 font-sans">
                            Categoria
                        </Label>
                        <Select onValueChange={setCategoria} value={categoria}>
                            <SelectTrigger className={`w-full h-12 px-3 py-3.5 border border-gray-300 rounded-lg text-base font-normal font-sans ${categoria ? "text-gray-800" : "text-gray-400"}`}>
                                <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent className="[&_[data-state=checked]_svg]:text-brand [&_[data-state=checked]_svg]:stroke-brand">
                                <SelectGroup className="bg-white">
                                    <SelectLabel>Categorias</SelectLabel>
                                    <SelectItem value="alimentacao">Alimentação</SelectItem>
                                    <SelectItem value="transporte">Transporte</SelectItem>
                                    <SelectItem value="saude">Saúde</SelectItem>
                                    <SelectItem value="lazer">Lazer</SelectItem>
                                    <SelectItem value="outros">Outros</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    </div>

                    {/* Botão Salvar */}
                    <Button
                        type="button"
                        onClick={onSuccess}
                        className="flex flex-row justify-center items-center px-4 py-3 gap-2 w-full h-12 bg-brand rounded-lg text-base font-medium font-sans text-white hover:bg-brand-dark transition-colors"
                    >
                        Salvar
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}