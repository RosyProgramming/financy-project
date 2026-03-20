import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'

function App() {

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
      <Routes>
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Layout>
  )
}

export default App
