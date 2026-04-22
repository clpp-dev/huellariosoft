import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from '@context/AuthContext'
import AppRoutes from '@/routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster
          position="top-right"
          expand={false}
          richColors
          closeButton
          duration={4000}
        />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
