import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "./Navbar"
import { useAuthStore } from "@/stores/auth"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAuthStore()
  
  return (
    <div className="min-h-screen bg-gray-100 p-0">
      {/* Header só se estiver logado */}
      {isAuthenticated && <Navbar />}
      <main className="mx-auto px-16 py-4">{children}</main>
      <Toaster />
    </div>
  )
}