import { Route, Switch } from 'react-router-dom'
import { Navbar } from './components/ui/navbar'
import { MainLayout } from './layouts/mainLayout'
import { LoginLayout } from './layouts/loginLayout'
import { UserLayout } from './layouts/userLayout'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfession'
import { QualitiesProvider } from './hooks/useQualities'
import AuthProvider from './hooks/useAuth'
import { ProtectedRoute } from './components/common/protectedRoute'
import { LogoutLayout } from './layouts/logoutLayout'
import 'react-toastify/dist/ReactToastify.css'

export const App = () => {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <Navbar />
        <ProfessionProvider>
          <QualitiesProvider>
            <Switch>
              <Route exact path="/" component={MainLayout} />
              <Route path="/login/:type?" component={LoginLayout} />
              <ProtectedRoute path="/users/:userId?/:mode?" component={UserLayout} />
              <Route path="/logout" component={LogoutLayout} />
            </Switch>
          </QualitiesProvider>
        </ProfessionProvider>
      </AuthProvider>
    </>
  )
}
