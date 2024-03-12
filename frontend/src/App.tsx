import './App.css'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'
import { AuthProvider } from './contexts/useAuth.tsx'  

import FormsComponent from './components/forms/Forms.tsx'
import PhotosComponent from './components/photos/Photos.tsx'

import {
  Routes,
  Route
} from 'react-router-dom'
// import ErrorPage from './components/Error/ErrorPage.tsx'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<FormsComponent />}/>
        <Route
          path="/fotos"
          element={
            <ProtectedRoute>
              <PhotosComponent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
