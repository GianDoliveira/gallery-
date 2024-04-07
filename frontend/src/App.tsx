import './App.css'
import { UserProvider } from './Context/useAuth.tsx'
import FormsComponent from './components/pages/forms/Forms.tsx'


function App() {
  return (
    <UserProvider>
      <FormsComponent/>
    </UserProvider>
  )
}

export default App
