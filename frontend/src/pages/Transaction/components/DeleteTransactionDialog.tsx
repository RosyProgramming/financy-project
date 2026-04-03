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
import { toast } from "sonner";
import type { Transaction } from "@/types"
import { useMutation } from "@apollo/client/react"
import { CheckCircle } from "lucide-react";
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transactions";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transactions";

interface DeleteTransactionDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    transaction: Transaction | null 
    onDelete?: (transaction: Transaction) => void
}

export function DeleteTransactionDialog({
    open,
    onOpenChange,
    transaction
}: DeleteTransactionDialogProps) {

    type DeleteTransactionMutationData = {
        deleteTransaction: boolean
    }

    type DeleteTransactionVariables = {
        id: string
    }

    const [deleteTransactionMutation, { loading }] = useMutation<DeleteTransactionMutationData,DeleteTransactionVariables>(DELETE_TRANSACTION, {
        onCompleted: () => {
             toast.success("Transação excluída com sucesso", {
                icon: <CheckCircle className="text-success w-5 h-5" />
            })

            onOpenChange(false)
        },
            
        refetchQueries: [LIST_TRANSACTIONS]
    })

    const handleDeleteTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!transaction) return

        try {
            await deleteTransactionMutation({
            variables: { id: transaction.id }
            })
        } catch (error: any) {
            const message =error?.graphQLErrors?.[0]?.message || "Não foi possível excluir transação"

            toast.error(message, {
                icon: <CheckCircle className="text-danger w-5 h-5" />
            })
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-gray-100">
                <AlertDialogHeader>
                <AlertDialogTitle className="text-base font-semibold leading-6 text-gray-800">Deseja excluir essa transação?</AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-gray-600 leading-5">
                    Esta ação não pode ser desfeita. Isso excluirá permanentemente sua transação de nossos servidores.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel 
                    onClick={() => onOpenChange(false)}
                    className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                        Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                    onClick={handleDeleteTransaction}
                    disabled={loading}
                    className="bg-brand text-white hover:bg-brand-dark transition-colors">
                        Remover
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
  
    )
}