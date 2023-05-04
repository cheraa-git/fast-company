import { Route, Switch } from 'react-router-dom'
import { Navbar } from './components/ui/navbar'
import { MainLayout } from './layouts/mainLayout'
import { LoginLayout } from './layouts/loginLayout'
import { UserLayout } from './layouts/userLayout'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfession'
import { QualitiesProvider } from './hooks/useQualities'

export const App = () => {
  return (
    <>
      <Navbar />
      <ProfessionProvider>
        <QualitiesProvider>
          <Switch>
            <Route exact path="/" component={MainLayout} />
            <Route path="/login/:type?" component={LoginLayout} />
            <Route path="/users/:userId?/:mode?" component={UserLayout} />
          </Switch>
        </QualitiesProvider>
      </ProfessionProvider>
      <ToastContainer />
    </>
  )
}
