import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { GET_CATEGORY_SUMMARY, LIST_CATEGORIES } from "@/lib/graphql/queries/Categories"
import { toast } from "sonner";
import type { Category } from "@/types"
import { useMutation } from "@apollo/client/react"
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/Categories";
import { CheckCircle } from "lucide-react";

interface DeleteCategoryDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    categoria: Category | null
    onDelete?: (categoria: Category) => void
}

export function DeleteCategoryDialog({
    open,
    onOpenChange,
    categoria
}: DeleteCategoryDialogProps) {

    type DeleteCategoryMutationData = {
        deleteCategory: boolean
    }

    type DeleteCategoryVariables = {
        id: string
    }

    const [deleteCategoryMutation, { loading }] = useMutation<DeleteCategoryMutationData,DeleteCategoryVariables>(DELETE_CATEGORY, {
        onCompleted: () => {
             toast.success("Categoria excluída com sucesso", {
                icon: <CheckCircle className="text-success w-5 h-5" />
            })

            onOpenChange(false)
        },
            
        refetchQueries: [LIST_CATEGORIES, GET_CATEGORY_SUMMARY]
    })

    const handleDeleteCategory = async () => {
        if (!categoria) return

        try {
            await deleteCategoryMutation({
            variables: {
                id: categoria.id
            }
            })
        } catch (error: any) {
            const message =error?.graphQLErrors?.[0]?.message ||error?.message ||
            "Erro ao excluir categoria"

            toast.error(message, {
                icon: <CheckCircle className="text-danger w-5 h-5" />
            })
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-gray-100">
                <AlertDialogHeader>
                <AlertDialogTitle className="text-base font-semibold leading-6 text-gray-800">Deseja excluir essa categoria?</AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-gray-600 leading-5">
                    Esta ação não pode ser desfeita. Isso excluirá permanentemente sua categoria de nossos servidores.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel 
                    onClick={() => onOpenChange(false)}
                    className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                        Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                    onClick={handleDeleteCategory}
                    disabled={loading}
                    className="bg-brand text-white hover:bg-brand-dark transition-colors">
                        Confirma
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
  
    )
}