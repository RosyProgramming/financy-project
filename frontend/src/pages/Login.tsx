import { useState } from "react"
import logo from "@/assets/logo.svg"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock } from "lucide-react"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit= async () => {

  }

  return (
    <div className="flex flex-col items-center p-12 gap-8 min-h-screen bg-gray-100">
      
      <img src={logo} className="w-[134px] h-8" />

      <Card className="w-full max-w-md p-8 flex flex-col gap-8 bg-white border border-gray-200 rounded-xl min-h-[36rem]">

        <CardHeader className="flex flex-col items-center justify-center gap-1 text-center w-full">
          <CardTitle className="text-xl font-bold text-gray-800 text-center w-full leading-7">
            Fazer login
          </CardTitle>
          <CardDescription className="text-base text-gray-600 text-center w-full">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor='email'  className="text-sm font-medium text-gray-700">E-mail</label>
                        <div className="relative">

                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                            <input
                                id="email"
                                type="email"
                                placeholder="mail@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                        </div>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor='password'  className="text-sm font-medium text-gray-700">Senha</label>
                        <div className="relative">

                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                            <input
                                id="password"
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                        </div>
                </div>
            </form>
        </CardContent>
      </Card>

    </div>
  )
}