// src/components/dialogs/ForgotPasswordDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { Mail, Lock, CheckCircle, ArrowRight, Eye, EyeClosed } from "lucide-react"
import { useAuthStore } from "@/stores/auth"

interface ForgotPasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Step = "email" | "reset"

export function ForgotPasswordDialog({ open, onOpenChange }: ForgotPasswordDialogProps) {
  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [generatedToken, setGeneratedToken] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const forgotPassword = useAuthStore((state) => state.forgotPassword)
  const resetPassword = useAuthStore((state) => state.resetPassword)

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen)
    if (!isOpen) {
      setStep("email")
      setEmail("")
      setGeneratedToken("")
      setNewPassword("")
      setConfirmPassword("")
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    try {
      const result = await forgotPassword({ email })
      if (result?.token) {
        setGeneratedToken(result.token) // guarda o token invisível
        setStep("reset")
        toast.success("Token gerado! Agora defina sua nova senha.", {
          icon: <CheckCircle className="text-success w-5 h-5" />,
        })
      }
    } catch (error: any) {
      const message =
        error?.graphQLErrors?.[0]?.message ||
        error?.message ||
        "Erro ao buscar usuário"
      toast.error(message, {
        icon: <CheckCircle className="text-danger w-5 h-5" />,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem", {
        icon: <CheckCircle className="text-danger w-5 h-5" />,
      })
      return
    }
    if (newPassword.length < 8) {
      toast.error("A senha deve ter no mínimo 8 caracteres", {
        icon: <CheckCircle className="text-danger w-5 h-5" />,
      })
      return
    }

    setLoading(true)
    try {
      await resetPassword({ token: generatedToken, newPassword }) // token invisível enviado aqui
      toast.success("Senha redefinida com sucesso!", {
        icon: <CheckCircle className="text-success w-5 h-5" />,
      })
      handleOpenChange(false)
    } catch (error: any) {
      const message =
        error?.graphQLErrors?.[0]?.message ||
        error?.message ||
        "Token inválido ou expirado"
      toast.error(message, {
        icon: <CheckCircle className="text-danger w-5 h-5" />,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-[448px] p-6 gap-6">

        <DialogHeader className="flex flex-col gap-0.5">
          <DialogTitle className="text-base font-semibold leading-6 text-gray-800">
            {step === "email" ? "Recuperar senha" : "Redefinir senha"}
          </DialogTitle>
          <DialogDescription className="text-sm font-normal leading-5 text-gray-600">
            {step === "email"
              ? "Informe seu e-mail para recuperar a senha"
              : "Defina uma nova senha para sua conta"}
          </DialogDescription>
        </DialogHeader>

        {/* ── STEP 1: e-mail ── */}
        {step === "email" && (
          <form onSubmit={handleForgotPassword} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-sm font-medium text-gray-700">E-mail</Label>
              <div className="relative w-full">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="mail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !email}
              className="flex items-center justify-center gap-2 w-full h-12 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
              <ArrowRight className="w-4 h-4" />
              {loading ? "Verificando..." : "Continuar"}
            </Button>
          </form>
        )}

        {/* ── STEP 2: nova senha ── */}
        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4 w-full">

            <div className="flex flex-col gap-2 w-full">
              <Label className="text-sm font-medium text-gray-700">Nova senha</Label>
              <div className="relative w-full">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400"
                />
                <Button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4 text-gray-400" />
                  ) : (
                    <EyeClosed className="w-4 h-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label className="text-sm font-medium text-gray-700">Confirmar senha</Label>
              <div className="relative w-full">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="Repita a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400"
                />
                <Button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                  {showPasswordConfirm ? (
                    <Eye className="w-4 h-4 text-gray-400" />
                  ) : (
                    <EyeClosed className="w-4 h-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <span className="text-xs text-danger">As senhas não coincidem</span>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              className="flex items-center justify-center gap-2 w-full h-12 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              {loading ? "Salvando..." : "Salvar alterações"}
            </Button>
          </form>
        )}

      </DialogContent>
    </Dialog>
  )
}