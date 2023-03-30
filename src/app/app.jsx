import { Route, Switch } from 'react-router-dom'
import { Navbar } from './components/ui/navbar'
import { MainLayout } from './layouts/mainLayout'
import { LoginLayout } from './layouts/loginLayout'
import { UserLayout } from './layouts/userLayout'

export const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={MainLayout} />
        <Route path="/login/:type?" component={LoginLayout} />
        <Route path="/users/:userId?/:mode?" component={UserLayout} />
      </Switch>
    </>
  )
}
