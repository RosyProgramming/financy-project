import { useAuthStore } from "@/stores/auth"
import { Link, NavLink } from "react-router-dom"
import logoIcon from "@/assets/logo-icon.svg"
import { Avatar, AvatarFallback } from "./ui/avatar"

export function Navbar() {
  const { user } = useAuthStore()
 
  function getLinkClass(isActive: boolean) {
    return `text-sm transition-colors ${
      isActive
        ? "text-brand font-semibold"
        : "text-gray-600"
    }`
  }

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
          <NavLink 
            to="/" 
            className={({ isActive }) => getLinkClass(isActive)}
          >
            Dashboard
          </NavLink>

          <NavLink 
            to="/transactions" 
            className={({ isActive }) => getLinkClass(isActive)}
          >
            Transações
          </NavLink>

          <NavLink 
            to="/categories" 
            className={({ isActive }) => getLinkClass(isActive)}
          >
            Categorias
          </NavLink>
        </nav>

        {/* PROFILE */}
        <Link to="/profile" className="ml-auto">
        <Avatar className="w-9 h-9 cursor-pointer">
          <AvatarFallback className="bg-gray-300 text-gray-800 text-sm font-medium">
            {user?.fullName?.[0] ?? "U"}
          </AvatarFallback>
        </Avatar>
      </Link>
      </div>
    </header>
  )
}