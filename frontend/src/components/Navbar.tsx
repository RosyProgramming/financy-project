import { useAuthStore } from "@/stores/auth"
import { Link } from "react-router-dom"
import logoIcon from "@/assets/logo-icon.svg"
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="relative max-w-[1280px] mx-auto px-12 py-4 flex items-center">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src={logoIcon} className="w-6 h-6" />
          <span className="text-sm font-semibold text-brand">
            Financy
          </span>
        </div>

        {/* NAV CENTRAL */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex gap-6">
          <Link to="/" className="text-sm font-semibold text-brand">
            Dashboard
          </Link>
          <Link to="/transactions" className="text-sm text-gray-600">
            Transações
          </Link>
          <Link to="/categories" className="text-sm text-gray-600">
            Categorias
          </Link>
        </nav>

        {/* PROFILE */}
        <div
          className="ml-auto w-9 h-9 flex items-center justify-center rounded-full bg-gray-300 text-sm font-medium text-gray-800 cursor-pointer"
          onClick={() => navigate("/profile")} 
        >
          {user?.fullName?.[0] ?? "U"}
        </div>
      </div>
    </header>
  )
}