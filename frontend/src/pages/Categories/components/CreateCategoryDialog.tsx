import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog"
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
    BriefcaseBusiness, CarFront, HeartPulse, PiggyBank, ShoppingCart, Ticket,
    ToolCase, Utensils, PawPrint, House, Gift, Dumbbell,
    BookOpen, BaggageClaim, Mailbox, ReceiptText
} from "lucide-react"

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
    { key: "receipt",           icon: ReceiptText },
]

const colors = [
    { key: "green",  rect: "bg-green-base",  border: "border-brand",   bg: "bg-gray-100" },
    { key: "blue",   rect: "bg-blue-base",   border: "border-gray-300", bg: "bg-transparent" },
    { key: "purple", rect: "bg-purple-base", border: "border-gray-300", bg: "bg-transparent" },
    { key: "pink",   rect: "bg-pink-base",   border: "border-gray-300", bg: "bg-transparent" },
    { key: "red",    rect: "bg-red-base",    border: "border-gray-300", bg: "bg-transparent" },
    { key: "orange", rect: "bg-orange-base", border: "border-gray-300", bg: "bg-transparent" },
    { key: "yellow", rect: "bg-yellow-base", border: "border-gray-300", bg: "bg-transparent" },
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {/* Modal: w-[448px], p-6, gap-6, border border-gray-200, rounded-xl */}
            <DialogContent className="flex flex-col items-start p-6 gap-6 w-[448px] bg-white border border-gray-200 rounded-xl">

                {/* Header: flex-row, gap-4, h-[46px] */}
                <DialogHeader className="flex flex-row items-start gap-4 w-full h-[46px] p-0">
                    {/* Frame 1: flex-col, gap-0.5, flex-1 */}
                    <div className="flex flex-col justify-center gap-0.5 flex-1">
                        {/* Nova categoria: text-base font-semibold text-gray-800 */}
                        <DialogTitle className="w-full text-base font-semibold leading-6 text-gray-800 font-sans">
                            Nova categoria
                        </DialogTitle>
                        {/* Subtítulo: text-sm font-normal text-gray-600 */}
                        <DialogDescription className="w-full text-sm font-normal leading-5 text-gray-600 font-sans">
                            Organize suas transações com categorias
                        </DialogDescription>
                    </div>
                    {/* Icon Button: w-8 h-8, border border-gray-300, rounded-lg — renderizado pelo DialogContent do shadcn */}
                </DialogHeader>

                {/* Form: flex-col, gap-4 */}
                <div className="flex flex-col items-start gap-4 w-full">

                    {/* Título: flex-col gap-2 */}
                    <div className="flex flex-col items-start gap-2 w-full">
                        {/* Label: text-sm font-medium text-gray-700 */}
                        <Label className="w-full text-sm font-medium leading-5 text-gray-700 font-sans">
                            Título
                        </Label>
                        {/* Input: h-12 px-3 py-3.5 border border-gray-300 rounded-lg */}
                        <Input
                            type="text"
                            placeholder="Ex. Alimentação"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full h-12 px-3 py-3.5 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 text-base font-normal font-sans focus:outline-none"
                        />
                    </div>

                    {/* Descrição: flex-col gap-2, helper text-xs text-gray-500 */}
                    <div className="flex flex-col items-start gap-2 w-full">
                        <div className="flex flex-row items-center gap-2 w-full">
                            {/* Label: text-sm font-medium text-gray-700 */}
                            <Label className="text-sm font-medium leading-5 text-gray-700 font-sans">
                                Descrição
                            </Label>
                            {/* Helper (Opcional): text-xs text-gray-500 */}
                            <span className="text-xs font-normal leading-4 text-gray-500 font-sans">
                                Opcional
                            </span>
                        </div>
                        {/* Input: h-12 px-3 py-3.5 border border-gray-300 rounded-lg */}
                        <Input
                            type="text"
                            placeholder="Descrição da categoria"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-12 px-3 py-3.5 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 text-base font-normal font-sans focus:outline-none"
                        />
                    </div>

                    {/* Ícone: flex-col gap-2 */}
                    <div className="flex flex-col items-start gap-2 w-full">
                        {/* Label: text-sm font-medium text-gray-700 */}
                        <Label className="w-full text-sm font-medium leading-5 text-gray-700 font-sans">
                            Ícone
                        </Label>
                        {/* Frame 2: flex-row flex-wrap gap-2 */}
                        <div className="flex flex-row flex-wrap items-start content-start gap-2 w-full">
                            {icons.map(({ key, icon: Icon }) => (
                                <Button
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
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Cor: flex-col gap-2 */}
                    <div className="flex flex-col items-start gap-2 w-full">
                        {/* Label: text-sm font-medium text-gray-700 */}
                        <Label className="w-full text-sm font-medium leading-5 text-gray-700 font-sans">
                            Cor
                        </Label>
                        {/* Frame 2: flex-row gap-2 — cada item: w-[50px] h-[30px] p-1 rounded-lg border */}
                        <div className="flex flex-row items-start gap-2 w-full">
                            {colors.map(({ key, rect, border, bg }) => (
                                <Button
                                    key={key}
                                    type="button"
                                    onClick={() => setSelectedColor(key)}
                                    className={`flex justify-center items-center flex-1 h-[30px] p-1 rounded-lg border transition-all
                                        ${selectedColor === key
                                            ? `${bg} ${border}`
                                            : "bg-transparent border-gray-300 hover:border-gray-400"
                                        }`}
                                >
                                    {/* Rectangle inner: rounded-[4px] h-5 flex-1 */}
                                    <div className={`w-full h-5 rounded-[4px] ${rect}`} />
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Botão Salvar: h-12 bg-brand rounded-lg text-white font-medium */}
                    <Button
                        type="button"
                        onClick={onSuccess}
                        className="flex justify-center items-center px-4 py-3 gap-2 w-full h-12 bg-brand rounded-lg text-base font-medium font-sans text-white hover:bg-brand-dark transition-colors"
                    >
                        Salvar
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}