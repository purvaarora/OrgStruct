import './App.css'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { LoginPage } from './views/loginPage'
import { HeirarchyPage } from './views/heirarchyPage'
import { LoadingSpinner } from './components/common/loadingSpinner'
import { DBProvider } from './context/DBProvider'
import { useDB } from './hooks/useDB'
import { useAuth } from './hooks/useAuth.hook'
import { useEffect } from 'react'

function AppContent() {
  const { loading: dbLoading } = useDB()
  const { user, login, logout, error, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!dbLoading && !authLoading && !user) {
      navigate('/login')
    } else if (!dbLoading && !authLoading && user) {
      navigate('/hierarchy')
    }
  }, [user, dbLoading, authLoading, navigate])

  if (dbLoading || authLoading) return <LoadingSpinner />

  return (
    <div className="app-container">
      {user && (
        <div className="app-logout">
          {`${user.firstName} ${user.lastName}`}
          <span>
            (<button onClick={logout}>Logout</button>)
          </span>
        </div>
      )}

      <h1 className="app-title">{user ? 'Heirarchy Tree' : 'Please Login'}</h1>

      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/hierarchy" replace />
            ) : (
              <LoginPage
                handleLogin={login}
                error={error}
                loading={authLoading}
              />
            )
          }
        />
        <Route
          path="/hierarchy"
          element={user ? <HeirarchyPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/"
          element={<Navigate to={user ? '/hierarchy' : '/login'} replace />}
        />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <DBProvider>
      <AppContent />
    </DBProvider>
  )
}
