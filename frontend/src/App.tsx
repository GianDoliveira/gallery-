import { Outlet } from 'react-router-dom'

import { UserProvider } from './Context/useAuth.tsx'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/pages/Navbar/Navbar.tsx'

function App() {
  return (
    <>
      <UserProvider>
        <Navbar />
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  )
}

export default App
