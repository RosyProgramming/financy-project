import { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, LogOut, UserRoundPlus, CheckCircle } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
    };

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

      <div className="w-[382px] h-px bg-gray-200 mx-auto" />

      {/* Inputs */}
        <form onSubmit={handleSave} className="flex flex-col gap-4 w-full">
            {/* Full Name */}
            <div className="flex flex-col gap-2 w-full">
                <label className="text-gray-700 font-medium text-sm">Nome Completo</label>
                <div className="flex items-center gap-3 w-full h-12 px-3 border border-gray-300 rounded-lg">
                    <User className="w-4 h-4 text-gray-400" />
                    <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="flex-1 outline-none text-gray-800"
                    />
                </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 w-full">
                <label className="text-gray-700 font-medium text-sm">E-mail</label>
                <div className="flex items-center gap-3 w-full h-12 px-3 border border-gray-300 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <input
                    type="email"
                    placeholder="conta@teste.com"
                    defaultValue={user?.email ?? ""}
                    readOnly
                    className="flex-1 outline-none text-gray-800"
                    />
                </div>
                <span className="text-xs text-gray-500">
                   O e-mail não pode ser alterado
                </span>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <button 
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-[382px] h-12 px-4 py-3 bg-brand text-gray-100 rounded-lg font-medium hover:bg-brand-dark transition-colors disabled:opacity-50 mx-auto">
                    <UserRoundPlus className="w-4 h-4" /> 
                    Salvar alterações
                </button>

                <button
                    className="flex items-center justify-center gap-2 w-[382px] h-12 px-4 py-3 border border-gray-300 bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 mx-auto"
                    onClick={() => {
                        logout()
                        navigate("/login");
                    }}
                >
                <LogOut className="w-[18px] h-[18px] text-danger" />
                    Sair da conta
                </button>
            </div>
        </form>
    </Card>
    </div>
    
  );
}