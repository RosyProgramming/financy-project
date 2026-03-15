import { useState } from "react";
import logo from "@/assets/logo.svg";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeClosed, UserRoundPlus } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    // Aqui você chamaria sua API
  };

  const isEmailActive = email.length > 0;
  const isPasswordActive = password.length > 0;

  return (
    <div className="flex flex-col items-center p-12 gap-8 min-h-screen bg-gray-100">
      <img src={logo} className="w-[134px] h-8" />

      <Card className="w-full max-w-md p-8 flex flex-col gap-8 bg-white border border-gray-200 rounded-xl min-h-[36rem]">
        <CardHeader className="flex flex-col items-center justify-center gap-1 text-center w-full">
          <CardTitle className="text-xl font-bold text-gray-800 leading-7">
            Fazer login
          </CardTitle>
          <CardDescription className="text-base text-gray-600 w-full text-center">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">

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
              <span className="text-xs text-gray-500">Digite seu e-mail</span>
            </div>

            {/* === SENHA === */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="password"
                className={`text-sm font-medium flex items-center ${isPasswordActive ? "text-brand" : "text-gray-700"}`}
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
              <span className="text-xs text-gray-500">Digite sua senha</span>
            </div>

            {/* === Lembrar-me e Esqueceu a senha === */}
            <div className="flex justify-between items-center w-full text-sm text-gray-700">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 border border-gray-300 rounded"
                />
                Lembrar-me
              </label>
              <a href="#" className="text-sm font-medium text-brand hover:underline">
                Recuperar a senha?
              </a>
            </div>

            {/* === BOTÃO LOGIN === */}
            <button
              type="submit"
              className="w-[382px] h-[48px] flex items-center justify-center gap-2 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors"
            >
              <UserRoundPlus className="w-4.5 h-4.5 flex-none rounded-sm p-0.5" />
              Entrar
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
                Ainda não tem uma conta?
              </span>
              <button
                type="button"
                className="w-[382px] h-[48px] flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                <UserRoundPlus className="w-4.5 h-4.5 flex-none rounded-sm p-0.5" />
                Criar conta
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}