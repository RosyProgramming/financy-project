import { useState } from "react";
import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  Lock,
  Eye,
  EyeClosed,
  UserRoundPlus,
  UserRound,
  LogIn,
  CheckCircle, XCircle
} from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

export function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const signup = useAuthStore((state) => state.signup);

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
  });

  // VALIDA EMAIL
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  //  FUNÇÃO PADRÃO DE ESTADO
  const getLabelState = (
    field: string,
    _value: string,
    error: string,
    disabled?: boolean
  ) => {
    if (disabled) return "text-gray-700";
    if (error) return "text-danger";
    if (focusedField === field) return "text-brand"; // ACTIVE
    return "text-gray-700"; // EMPTY + FILLED iguais
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
    if (value.length > 0) return "text-gray-800"; // FILLED
    return "text-gray-400"; // EMPTY
  };

  const validate = () => {
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
    };

    if (!fullName) newErrors.fullName = "Nome é obrigatório";
    if (!email) newErrors.email = "Email é obrigatório";
    if (password.length < 8)
      newErrors.password = "Mínimo 8 caracteres";

    setErrors(newErrors);

    return !newErrors.fullName && !newErrors.email && !newErrors.password;
  };

  // HANDLE CHANGE COM VALIDAÇÃO
  const handleChange = (field: string, value: string) => {
    if (field === "fullName") {
      setFullName(value);
      setErrors((prev) => ({
        ...prev,
        fullName: value ? "" : "Nome é obrigatório",
      }));
    }

    if (field === "email") {
      setEmail(value);
      if (!value) {
        setErrors((prev) => ({ ...prev, email: "Email é obrigatório" }));
      } else if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: "Email inválido" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    if (field === "password") {
      setPassword(value);
      setErrors((prev) => ({
        ...prev,
        password:
          value.length < 8 ? "Mínimo 8 caracteres" : "",
      }));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const cadastroMutate = await signup({
        fullName,
        email,
        password,
      });

      if (cadastroMutate) {
        toast.success("Cadastro realizado com sucesso!", {
           icon: <CheckCircle className="text-success w-5 h-5" />,
        });
      }
    } catch (error: any) {
      toast.error("Erro ao realizar o cadastro", {
         icon: <XCircle className="text-danger w-5 h-5" />,
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
          <CardTitle className="text-xl font-bold text-gray-800">
            Criar conta
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full"
          >
            {/* === NOME COMPLETO === */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="fullName"
                className={`text-sm font-medium ${getLabelState(
                  "fullName",
                  fullName,
                  errors.fullName,
                  loading
                )}`}
              >
                Nome completo
              </label>

              <div className="relative w-full">
                <UserRound
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${getIconState(
                    "fullName",
                    fullName,
                    errors.fullName,
                    loading
                  )}`}
                />

                <input
                  id="fullName"
                  type="text"
                  placeholder="Seu nome completo"
                  value={fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={() => {
                    setFocusedField(null);
                    setTouched((p) => ({ ...p, fullName: true }));
                  }}
                  disabled={loading}
                  className="w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
              {touched.fullName && errors.fullName && (
                <span className="text-xs text-danger">{errors.fullName}</span>
              )}
            </div>

            {/* === EMAIL === */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="email"
                className={`text-sm font-medium ${getLabelState(
                  "email",
                  email,
                  errors.email,
                  loading
                )}`}
              >
                E-mail
              </label>

              <div className="relative w-full">
                <Mail
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${getIconState(
                    "email",
                    email,
                    errors.email,
                    loading
                  )}`}
                />

                <input
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
                  disabled={loading}
                  className="w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
              {touched.email && errors.email && (
                <span className="text-xs text-danger">{errors.email}</span>
              )}
            </div>

            {/* === SENHA === */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="password"
                className={`text-sm font-medium ${getLabelState(
                  "password",
                  password,
                  errors.password,
                  loading
                )}`}
              >
                Senha
              </label>

              <div className="relative w-full">
                <Lock
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${getIconState(
                    "password",
                    password,
                    errors.password,
                    loading
                  )}`}
                />

                <input
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
                  disabled={loading}
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
              
               {touched.password && errors.password ? (
                  <span className="text-xs text-danger">
                    {errors.password}
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">
                    A senha deve ter no mínimo 8 caracteres
                  </span>
                )}
            </div>

            {/* === BOTÃO CADASTRAR === */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 flex items-center justify-center gap-2 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
              <UserRoundPlus className="w-4 h-4" />
              Cadastrar
            </button>

            {/* === DIVISOR === */}
            <div className="flex items-center gap-3">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="text-gray-500 text-sm">ou</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* === LOGIN === */}
            <div className="flex flex-col gap-4 w-full">
              <span className="text-sm text-gray-600 text-center">
                Já tem uma conta?
              </span>

              <button
                type="button"
                className="w-full h-12 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <Link to="/login">Fazer login</Link>
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}