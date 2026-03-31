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
import { useMutation } from "@apollo/client/react"
import { CREATE_CATEGORY } from "@/lib/graphql/mutations/Categories"
import { toast } from "sonner";
import { GET_CATEGORY_SUMMARY, LIST_CATEGORIES } from "@/lib/graphql/queries/Categories"
import { colorMap, iconMap } from "@/constants/Category"
import { CheckCircle } from "lucide-react"

interface CreateCategoryDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
}

const iconOptions = Object.entries(iconMap).map(([key, icon]) => ({
  key,
  icon
}))

const colorOptions = Object.entries(colorMap).map(([key, value]) => ({
  key,
  rect: value.bg
}))

export function CreateCategoryDialog({
    open,
    onOpenChange,
    onSuccess,
}: CreateCategoryDialogProps) {
    const [title, setTitle]               = useState("")
    const [description, setDescription]   = useState("")
    const [selectedIcon, setSelectedIcon] = useState("BriefcaseBusiness")
    const [selectedColor, setSelectedColor] = useState("green")

    const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
        refetchQueries: [LIST_CATEGORIES, GET_CATEGORY_SUMMARY]
    })

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
                
                <DialogHeader className="flex flex-row items-start gap-4 w-full h-[46px]">
                    
                    <div className="flex flex-col justify-center gap-0.5 flex-1">
                        
                        <DialogTitle className="w-full text-base font-semibold leading-6 text-gray-800 ">
                            Nova categoria
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
                            {iconOptions.map(({ key, icon: Icon }) => (
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
                            {colorOptions.map(({ key, rect }) => (
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