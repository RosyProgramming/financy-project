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
import { useEffect, useState } from "react"
import {
    BriefcaseBusiness, CarFront, HeartPulse, PiggyBank, ShoppingCart, Ticket,
    ToolCase, Utensils, PawPrint, House, Gift, Dumbbell,
    BookOpen, BaggageClaim, Mailbox, ReceiptText, CheckCircle
} from "lucide-react"
import { useMutation } from "@apollo/client/react"
import { UPDATE_CATEGORY  } from "@/lib/graphql/mutations/Categories"
import { toast } from "sonner";
import type { Category } from "@/types"

interface EditCategoryDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    categoria: Category | null
    onUpdated?: (categoria: Category) => void
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


export function EditCategoryDialog({
    open,
    onOpenChange,
    categoria,
    onUpdated
}: EditCategoryDialogProps) {
    const [title, setTitle]               = useState("")
    const [description, setDescription]   = useState("")
    const [selectedIcon, setSelectedIcon] = useState("briefcase")
    const [selectedColor, setSelectedColor] = useState("green")


    useEffect(() => {
        setTitle(categoria?.title ?? "")
        setDescription(categoria?.description ?? "")
        setSelectedIcon(categoria?.icon ?? "briefcase")
        setSelectedColor(categoria?.color ?? "green")
    },[categoria])


    type UpdateCategoriesMudatitionData = { updateCategory: Category }
    type UpdateCategoryVariables = { 
        id: string,
        data: { 
            title?: string
            description?: string
            icon?: string
            color?: string
        }
    }

    const [ updateCategoryMutation, {loading} ] = useMutation<UpdateCategoriesMudatitionData, UpdateCategoryVariables>(UPDATE_CATEGORY, {
        onCompleted: (res: UpdateCategoriesMudatitionData) => {
            setTitle("")
            setDescription("")
            setSelectedIcon("briefcase")
            setSelectedColor("green")

            const updated = res.updateCategory

            if(updated) {
                onUpdated?.(updated)
            }
            onOpenChange(false)
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!categoria) return

    try {
        await updateCategoryMutation({
            variables: {
                id: categoria.id,
                data: {
                    title,
                    description,
                    icon: selectedIcon,
                    color: selectedColor
                }
            }
        })

        toast.success("Categoria atualizada com sucesso", {
            icon: <CheckCircle className="text-success w-5 h-5" />
        })


    } catch (error: any) {
        const message =
            error?.graphQLErrors?.[0]?.message ||
            error?.message ||
            "Erro ao atualizar categoria"

        toast.error(message, {
            icon: <CheckCircle className="text-danger w-5 h-5" />
        })
    }
}

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-[448px] p-6 gap-6">
                <DialogHeader className="flex flex-row items-start gap-4 w-full h-[46px]">
                    <div className="flex flex-col justify-center gap-0.5 flex-1">
                        <DialogTitle className="w-full text-base font-semibold leading-6 text-gray-800 ">
                            Editar categoria
                        </DialogTitle>
                        <DialogDescription className="w-full text-sm font-normal leading-5 text-gray-600 ">
                            Organize suas transações com categorias
                        </DialogDescription>
                    </div>
                </DialogHeader>

               
                <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4 w-full">

                    <div className="flex flex-col items-start gap-2 w-full">
                        <Label className="w-full text-sm font-medium leading-5 text-gray-700 ">
                            Título
                        </Label>
                        <Input
                            type="text"
                            placeholder="Ex. Alimentação"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={loading}
                            className="w-full h-12 px-3  py-[14px] border border-gray-300 rounded-lg"
                        />
                    </div>

 
                    <div className="flex flex-col items-start gap-2 w-full">
                        <div className="flex flex-row items-center gap-2 w-full">
                            <Label className="text-sm font-medium leading-5 text-gray-700 ">
                                Descrição
                            </Label>
                            <span className="text-xs font-normal leading-4 text-gray-500 ">
                                Opcional
                            </span>
                        </div>
                        <Input
                            type="text"
                            placeholder="Descrição da categoria"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={loading}
                            className="w-full h-12 px-3  py-[14px] border border-gray-300 rounded-lg"
                        />
                    </div>

  
                    <div className="flex flex-col items-start gap-2 w-full">
                        <Label className="w-full text-sm font-medium leading-5 text-gray-700 ">
                            Ícone
                        </Label>
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

                   
                    <div className="flex flex-col items-start gap-2 w-full">
                        
                        <Label className="w-full text-sm font-medium leading-5 text-gray-700 ">
                            Cor
                        </Label>
                    
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