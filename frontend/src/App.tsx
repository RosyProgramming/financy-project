import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LoginPage } from './pages/Auth/Login'
import { SignupPage } from './pages/Auth/Signup'
import { useAuthStore } from './stores/auth'
import { DashboardPage } from './pages/Dashboard/Dashboard'
import { ProfilePage } from './pages/Profile/Profile'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}


function App() {
  return (
    <Layout>
      <Routes> 
        <Route 
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route 
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route 
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
