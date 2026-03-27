import { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, LogOut, UserRoundPlus, CheckCircle } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const updateUser = useAuthStore((state) => state.updateUser);
  const [loading, setLoading] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const success = await updateUser({
                fullName,
            });

            if (success) {
            toast.success("Atualizado com sucesso", {
                icon: <CheckCircle className="text-success w-5 h-5" />,
            });
            }
        } catch (error: any) {
            toast.error("Erro ao atualizar usuário", {
                icon: <CheckCircle className="text-danger w-5 h-5" />,
            });
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

  return (
    <div className="w-full flex flex-col p-8 items-center gap-8">
    <Card className=" p-8 gap-8 w-[448px] h-[609px] border-gray-200 bg-white rounded-lg">
      
      {/* Header */}
      <CardHeader className="flex flex-col items-center gap-6 w-full">
        {/* Avatar */}
        <div className="flex flex-col items-center justify-center w-16 h-16 bg-gray-300 rounded-full">
          <span className="text-gray-800 text-2xl font-medium">{user?.fullName?.[0] ?? "U"}</span>
        </div>

        {/* Name & Email */}
        <div className="flex flex-col items-center text-center gap-1">
          <CardTitle className="text-gray-800 font-semibold text-xl">{user?.fullName ?? "Conta Teste"}</CardTitle>
          <CardDescription className="text-gray-500 font-normal text-base">{user?.email ?? "conta@teste.com"}</CardDescription>
        </div>
      </CardHeader>

      <Separator className="w-[382px] h-px bg-gray-200 mx-auto" />

      {/* Inputs */}
        <form onSubmit={handleSave} className="flex flex-col gap-4 w-full">
            {/* Full Name */}
            <div className="flex flex-col gap-2 w-full">
                <Label className="text-gray-700 font-medium text-sm">Nome Completo</Label>
                <div className="relative w-full">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 w-full">
                <Label className="text-gray-700 font-medium text-sm">E-mail</Label>
                <div className="relative w-full">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                    type="email"
                    placeholder="conta@teste.com"
                    defaultValue={user?.email ?? ""}
                    readOnly
                    className="w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder:text-gray-400"
                    />
                </div>
                <span className="text-xs text-gray-500">
                   O e-mail não pode ser alterado
                </span>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <Button 
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-[382px] h-12 px-4 py-3 bg-brand text-gray-100 rounded-lg font-medium hover:bg-brand-dark transition-colors disabled:opacity-50 mx-auto">
                    <UserRoundPlus className="w-4 h-4" /> 
                    Salvar alterações
                </Button>

                <Button
                    className="flex items-center justify-center gap-2 w-[382px] h-12 px-4 py-3 border border-gray-300 bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 mx-auto"
                    onClick={handleLogout}
                >
                <LogOut className="w-[18px] h-[18px] text-danger" />
                    Sair da conta
                </Button>
            </div>
        </form>
    </Card>
    </div>
    
  );
}