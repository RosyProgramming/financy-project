import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
    BriefcaseBusiness, CarFront, HeartPulse, PiggyBank, ShoppingCart, Ticket,
    ToolCase, Utensils, PawPrint, House, Gift, Dumbbell,
    BookOpen, BaggageClaim, Mailbox, ReceiptText, CheckCircle
} from "lucide-react"
import { useMutation } from "@apollo/client/react"
import { CREATE_CATEGORIES } from "@/lib/graphql/mutations/Categories"
import { toast } from "sonner";

interface CreateCategoryDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
}

const icons = [
    { key: "BriefcaseBusiness", icon: BriefcaseBusiness },
    { key: "CarFront",          icon: CarFront },
    { key: "HeartPulse",        icon: HeartPulse },
    { key: "PiggyBank",         icon: PiggyBank },
    { key: "ShoppingCart",      icon: ShoppingCart },
    { key: "Ticket",            icon: Ticket },
    { key: "wrench",            icon: ToolCase },
    { key: "utensils",          icon: Utensils },
    { key: "pawprint",          icon: PawPrint },
    { key: "home",              icon: House },
    { key: "gift",              icon: Gift },
    { key: "dumbbell",          icon: Dumbbell },
    { key: "bookopen",          icon: BookOpen },
    { key: "baggage",           icon: BaggageClaim },
    { key: "mailbox",           icon: Mailbox },
    { key: "receipt",           icon: ReceiptText }
]

const colors = [
  { key: "green",  rect: "bg-green-base" },
  { key: "blue",   rect: "bg-blue-base" },
  { key: "purple", rect: "bg-purple-base" },
  { key: "pink",   rect: "bg-pink-base" },
  { key: "red",    rect: "bg-red-base" },
  { key: "orange", rect: "bg-orange-base" },
  { key: "yellow", rect: "bg-yellow-base" }
]


export function CreateCategoryDialog({
    open,
    onOpenChange,
    onSuccess,
}: CreateCategoryDialogProps) {
    const [title, setTitle]               = useState("")
    const [description, setDescription]   = useState("")
    const [selectedIcon, setSelectedIcon] = useState("briefcase")
    const [selectedColor, setSelectedColor] = useState("green")

    const [ createCategory, { loading } ] = useMutation(CREATE_CATEGORIES)

    const handleOpenChange = (isOpen: boolean) => {
        onOpenChange(isOpen)

        if (!isOpen) {
            setTitle("")
            setDescription("")
            setSelectedIcon("briefcase")
            setSelectedColor("green")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await createCategory({
            variables: {
                data: {
                title,
                description,
                icon: selectedIcon,
                color: selectedColor,
                }
            }
            })

            toast.success("Categoria criada com sucesso", {
                icon: <CheckCircle className="text-success w-5 h-5" />
            })
            handleOpenChange(false)
            onSuccess()

        } catch (error: any) {
            const message =
                error?.graphQLErrors?.[0]?.message ||
                error?.message ||
                "Erro ao criar categoria"

            toast.error(message, {
                icon: <CheckCircle className="text-danger w-5 h-5" />
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="w-full max-w-[448px] p-6 gap-6">
                {/* Header: flex-row, gap-4, h-[46px] */}
                <DialogHeader className="flex flex-row items-start gap-4 w-full h-[46px]">
                    {/* Frame 1: flex-col, gap-0.5, flex-1 */}
                    <div className="flex flex-col justify-center gap-0.5 flex-1">
                        {/* Nova categoria: text-base font-semibold text-gray-800 */}
                        <DialogTitle className="w-full text-base font-semibold leading-6 text-gray-800 ">
                            Nova categoria
                        </DialogTitle>
                        {/* Subtítulo: text-sm font-normal text-gray-600 */}
                        <DialogDescription className="w-full text-sm font-normal leading-5 text-gray-600 ">
                            Organize suas transações com categorias
                        </DialogDescription>
                    </div>
                    {/* Icon Button: w-8 h-8, border border-gray-300, rounded-lg — renderizado pelo DialogContent do shadcn */}
                </DialogHeader>

                {/* Form: flex-col, gap-4 */}
                <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4 w-full">

                    {/* Título: flex-col gap-2 */}
                    <div className="flex flex-col items-start gap-2 w-full">
                        {/* Label: text-sm font-medium text-gray-700 */}
                        <Label className="w-full text-sm font-medium leading-5 text-gray-700 ">
                            Título
                        </Label>
                        {/* Input: h-12 px-3 py-3.5 border border-gray-300 rounded-lg */}
                        <Input
                            type="text"
                            placeholder="Ex. Alimentação"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={loading}
                            className="w-full h-12 px-3  py-[14px] border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Descrição: flex-col gap-2, helper text-xs text-gray-500 */}
                    <div className="flex flex-col items-start gap-2 w-full">
                        <div className="flex flex-row items-center gap-2 w-full">
                            {/* Label: text-sm font-medium text-gray-700 */}
                            <Label className="text-sm font-medium leading-5 text-gray-700 ">
                                Descrição
                            </Label>
                            {/* Helper (Opcional): text-xs text-gray-500 */}
                            <span className="text-xs font-normal leading-4 text-gray-500 ">
                                Opcional
                            </span>
                        </div>
                        {/* Input: h-12 px-3 py-3.5 border border-gray-300 rounded-lg */}
                        <Input
                            type="text"
                            placeholder="Descrição da categoria"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={loading}
                            className="w-full h-12 px-3  py-[14px] border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Ícone: flex-col gap-2 */}
                    <div className="flex flex-col items-start gap-2 w-full">
                        {/* Label: text-sm font-medium text-gray-700 */}
                        <Label className="w-full text-sm font-medium leading-5 text-gray-700 ">
                            Ícone
                        </Label>
                        {/* Frame 2: flex-row flex-wrap gap-2 */}
                        <div className="flex flex-row flex-wrap items-start content-start gap-2 w-[398px]">
                            {icons.map(({ key, icon: Icon }) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setSelectedIcon(key)}
                                    className={`flex justify-center items-center w-[42px] h-[42px] rounded-lg border transition-all
                                        ${selectedIcon === key
                                            ? "bg-gray-100 border-brand"
                                            : "bg-transparent border-gray-300 hover:border-gray-400"
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${selectedIcon === key ? "text-gray-600" : "text-gray-500"}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cor: flex-col gap-2 */}
                    <div className="flex flex-col items-start gap-2 w-full">
                        {/* Label: text-sm font-medium text-gray-700 */}
                        <Label className="w-full text-sm font-medium leading-5 text-gray-700 ">
                            Cor
                        </Label>
                        {/* Frame 2: flex-row gap-2 — cada item: w-[50px] h-[30px] p-1 rounded-lg border */}
                        <div className="flex flex-row items-start gap-2 w-full">
                            {colors.map(({ key, rect }) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setSelectedColor(key)}
                                className={`flex justify-center items-center flex-1 h-[30px] p-1 rounded-lg border transition-all
                                ${
                                    selectedColor === key
                                    ? "bg-gray-100 border-brand"
                                    : "bg-transparent border-gray-300 hover:border-gray-400"
                                }`}
                            >
                                <div className={`w-full h-5 rounded-[4px] ${rect}`} />
                            </button>
                            ))}
                        </div>
                    </div>

                    {/* Botão Salvar: h-12 bg-brand rounded-lg text-white font-medium */}
                    <Button
                        type="submit"
                        className="flex justify-center items-center px-4 py-3 gap-2 w-full h-12 bg-brand rounded-lg text-base font-medium  text-white hover:bg-brand-dark transition-colors"
                    >
                        Salvar
                    </Button>

                </form>
            </DialogContent>
        </Dialog>
    )
}