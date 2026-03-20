import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Login } from './pages/Login'
import { Cadastro } from './pages/Cadastro'

function App() {

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
      <Routes>
        <Route path='/cadastro' element={<Cadastro />} />
      </Routes>
    </Layout>
  )
}

export default App
