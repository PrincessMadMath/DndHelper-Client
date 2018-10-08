/* Utils */
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

/* Components */
import App from './app'
import About from './about'
import NotFound from './404'

const Routes = props =>
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/about' component={About} />
      <Route component={NotFound} />
    </Switch>
  </Router>

export default Routes
