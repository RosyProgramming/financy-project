import { useState  } from "react";
import logo from "@/assets/logo.svg";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeClosed, UserRoundPlus, UserRound, LogIn } from "lucide-react";

export function Cadastro() {
  // Inicializa direto do localStorage
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ email, password });


    // Aqui você chamaria sua API para logar de verdade
  };

  const isEmailActive = email.length > 0;
  const isPasswordActive = password.length > 0;

  return (
    <div className="flex flex-col items-center p-12 gap-8 min-h-screen bg-gray-100">
      <img src={logo} className="w-[134px] h-8" />

      <Card className="w-full max-w-md p-8 flex flex-col gap-8 bg-white border border-gray-200 rounded-xl min-h-[36rem]">
        <CardHeader className="flex flex-col items-center justify-center gap-1 text-center w-full">
          <CardTitle className="text-xl font-bold text-gray-800 leading-7">
            Criar conta
          </CardTitle>
          <CardDescription className="text-base text-gray-600 w-full text-center">
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="relative w-full">

                {/* === NOME COMPLETO === */}
                <div className="flex flex-col gap-2 w-full">
                <label
                    htmlFor="fullName"
                     className={`text-sm font-medium flex items-center ${isEmailActive ? "text-brand" : "text-gray-700"}`}
                >
                    Nome completo
                </label>
                {/* Ícone de perfil */}
                <UserRound
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isEmailActive ? "text-brand" : "text-gray-400"}`}
                />
                <input
                  id="fullName"
                  type="text"
                  placeholder="Seu nome completo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* === EMAIL === */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="email"
                className={`text-sm font-medium flex items-center ${isEmailActive ? "text-brand" : "text-gray-700"}`}
              >
                E-mail
              </label>
              <div className="relative w-full">
                {/* Ícone de email */}
                <Mail
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    isEmailActive ? "text-brand" : "text-gray-400"
                  }`}
                />
                <input
                  id="email"
                  type="email"
                  placeholder="mail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* === SENHA === */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="password"
                 className={`text-sm font-medium flex items-center ${isEmailActive ? "text-brand" : "text-gray-700"}`}
              >
                Senha
              </label>
              <div className="relative w-full">
                {/* Ícone de senha */}
                <Lock
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    isPasswordActive ? "text-brand" : "text-gray-400"
                  }`}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-10 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4 text-gray-400" />
                  ) : (
                    <EyeClosed className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              <span className="text-xs text-gray-500">A senha deve ter no mínimo 8 caracteres</span>
            </div>

            {/* === BOTÃO Cadastrar === */}
            <button
              type="submit"
              className="w-[382px] h-[48px] flex items-center justify-center gap-2 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors"
            >
              <UserRoundPlus className="w-4.5 h-4.5 flex-none rounded-sm p-0.5" />
              Cadastrar
            </button>

            {/* === DIVISOR HORIZONTAL === */}
            <div className="flex items-center gap-2">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="text-gray-500 text-sm">ou</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* === BOTÃO CRIAR CONTA === */}
            <div className="flex flex-col gap-2 w-full items-center">
              <span className="w-[382px] h-5 text-sm text-gray-600 text-center">
                Já tem uma conta?
              </span>
              <button
                type="button"
                className="w-[382px] h-[48px] flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                <LogIn className="w-4.5 h-4.5 flex-none rounded-sm p-0.5" />
                Fazer login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}