import { useState  } from "react"
import { Link } from "react-router-dom"
import logo from "@/assets/logo.svg"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock, Eye, EyeClosed, UserRoundPlus } from "lucide-react"
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginPage() {
  // Inicializa direto do localStorage
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [password, setPassword] = useState(() => localStorage.getItem("password") || "");
  const [rememberMe, setRememberMe] = useState(() => !!(localStorage.getItem("email") && localStorage.getItem("password")));
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const emailRegex = /\S+@\S+\.\S+/;
  
  const login = useAuthStore((state) => state.login);

  //PADRÃO DE ESTADO
  const getLabelState = (
    field: string,
    value: string,
    error: string,
    disabled?: boolean
  ) => {
    if (disabled) return "text-gray-700";
    if (error) return "text-danger";
    if (focusedField === field) return "text-brand"; // ACTIVE
    return "text-gray-700"; // empty + filled
  };

  const getIconState = (
    field: string,
    value: string,
    error: string,
    disabled?: boolean
  ) => {
    if (disabled) return "text-gray-400";
    if (error) return "text-danger";
    if (focusedField === field) return "text-brand"; // ACTIVE
    if (value.length > 0) return "text-gray-800"; // filled
    return "text-gray-400"; // empty
  };

   const handleChange = (field: "email" | "password", value: string) => {
    if (field === "email") {
      setEmail(value);

      if (!value) {
        setErrors((p) => ({ ...p, email: "Email é obrigatório" }));
      } else if (!emailRegex.test(value)) {
        setErrors((p) => ({ ...p, email: "Email inválido" }));
      } else {
        setErrors((p) => ({ ...p, email: "" }));
      }
    }

    if (field === "password") {
      setPassword(value);

      if (!value) {
        setErrors((p) => ({
          ...p,
          password: "Senha é obrigatória",
        }));
      } else if (value.length < 8) {
        setErrors((p) => ({
          ...p,
          password: "Mínimo 8 caracteres",
        }));
      } else {
        setErrors((p) => ({
          ...p,
          password: "",
        }));
      }
    }
  };

  const validate = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    const emailRegex = /\S+@\S+\.\S+/;

    if (!email) {
      newErrors.email = "Email é obrigatório";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email inválido";
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória";
    }

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (errors.email || errors.password || !email || !password) {
      setTouched({
        email: true,
        password: true,
      });
      return;
    }
    
    setLoading(true);

    try {

      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      const loginMutation = await login({
        email, password
      });

      if (loginMutation) {  
        toast.success("Login realizado com sucesso!", {
          icon: <UserRoundPlus className="text-success w-5 h-5" />,
        });
      }
    } catch (error: any) {
      toast.error("Email ou senha inválidos", {
        icon: <UserRoundPlus className="text-danger w-5 h-5" />,
      });
    } finally {
      setLoading(false);
    }
  };


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
              <Label
                htmlFor="email"
                className={`text-sm font-medium  ${getLabelState("email", email, errors.email, loading)}`}
              >
                E-mail
              </Label>
              <div className="relative w-full">
                {/* Ícone de email */}
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${getIconState("email", email, errors.email, loading)}`} />
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@exemplo.com"
                  value={email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => {
                    setFocusedField(null);
                    setTouched((p) => ({ ...p, email: true }));
                  }}
                  className="w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
              {touched.email && errors.email && (
                <span className="text-xs text-danger">{errors.email}</span>
              )}
            </div>

            {/* === SENHA === */}
            <div className="flex flex-col gap-2 w-full">
              <Label
                htmlFor="password"
                className={`text-sm font-medium ${getLabelState("password", password, errors.password, loading)}`}
              >
                Senha
              </Label>
              <div className="relative w-full">
                {/* Ícone de senha */}
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${getIconState("password", password, errors.password, loading)}`} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => {
                    setFocusedField(null);
                    setTouched((p) => ({ ...p, password: true }));
                  }}
                  className="w-full h-12 pl-10 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none"
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
              {touched.password && errors.password && (
                <span className="text-xs text-danger">
                  {errors.password}
                </span>
              )}
            </div>

            {/* === Lembrar-me e Esqueceu a senha === */}
            <div className="flex justify-between items-center w-full text-sm text-gray-700">
              <Label className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 border border-gray-300 rounded"
                />
                Lembrar-me
              </Label>
              <a href="#" className="text-sm font-medium text-brand hover:underline">
                Recuperar a senha?
              </a>
            </div>

            {/* === BOTÃO LOGIN === */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full max-w-[382px] h-12 flex items-center justify-center gap-2 px-4 py-3 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UserRoundPlus className="w-4 h-4" />
              Entrar
            </Button>

            {/* === DIVISOR HORIZONTAL === */}
            <div className="flex items-center gap-3 h-5">
              <Separator className="flex-grow border-t border-gray-300 m-0" />
              <span className="text-gray-500 text-sm">ou</span>
              <Separator className="flex-grow border-t border-gray-300 m-0" />
            </div>

            {/* === BOTÃO CRIAR CONTA === */}
            <div className="flex flex-col gap-4 w-full max-w-[382px] items-start">
              <span className="w-full text-sm text-gray-600 text-center">
                Ainda não tem uma conta?
              </span>

              <Link
                to="/signup"
                className="w-full h-12 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
              >
                <UserRoundPlus className="w-4 h-4" />
                Criar conta
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}