import { Route, Switch } from 'react-router-dom'
import { Navbar } from './components/ui/navbar'
import { MainLayout } from './layouts/mainLayout'
import { LoginLayout } from './layouts/loginLayout'
import { UserLayout } from './layouts/userLayout'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './hooks/useAuth'
import { ProtectedRoute } from './components/common/protectedRoute'
import { LogoutLayout } from './layouts/logoutLayout'
import 'react-toastify/dist/ReactToastify.css'
import { AppLoader } from './components/ui/hoc/appLoader'

export const App = () => {
  return (
    <>
      <AppLoader>
        <AuthProvider>
          <ToastContainer />
          <Navbar />
          <Switch>
            <Route exact path="/" component={MainLayout} />
            <Route path="/login/:type?" component={LoginLayout} />
            <ProtectedRoute path="/users/:userId?/:mode?" component={UserLayout} />
            <Route path="/logout" component={LogoutLayout} />
          </Switch>
        </AuthProvider>
      </AppLoader>
    </>
  )
}
