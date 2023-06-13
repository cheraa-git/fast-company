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
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadQualities } from './store/qualities'
import { loadProfessions } from './store/professions'
import { loadUsers } from './store/users'

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadQualities())
    dispatch(loadProfessions())
    dispatch(loadUsers())
  }, [])
  return (
    <>
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
    </>
  )
}
