import './App.css'
import { LoginPage } from './views/loginPage'
import { HeirarchyPage } from './views/heirarchyPage'
import { LoadingSpinner } from './components/common/loadingSpinner'
import { DBProvider } from './context/DBProvider'
import { useDB } from './hooks/useDB'
import { useAuth } from './hooks/useAuth.hook'

function AppContent() {
  const { loading: dbLoading } = useDB()
  const { user, login, logout, error, loading: authLoading } = useAuth()

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

      {user ? (
        <HeirarchyPage />
      ) : (
        <LoginPage handleLogin={login} error={error} loading={authLoading} />
      )}
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
