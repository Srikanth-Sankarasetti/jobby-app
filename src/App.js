import {Redirect, Switch, Route} from 'react-router-dom'

import Login from './component/Login'
import Home from './component/Home'
import Jobs from './component/Jobs'
import JobItemDetails from './component/JobItemDetails'
import ProtectedRoute from './component/ProtectedRoute'
import NotFound from './component/NotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
