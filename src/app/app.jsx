import { Route, Switch } from 'react-router-dom'
import { Navbar } from './components/navbar'
import { MainLayout } from './layouts/mainLayout'
import { LoginLayout } from './layouts/loginLayout'
import { UserLayout } from './layouts/userLayout'

export const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={MainLayout} />
        <Route path="/login" component={LoginLayout} />
        <Route path="/users/:userId?" component={UserLayout} />
      </Switch>
    </>
  )
}
