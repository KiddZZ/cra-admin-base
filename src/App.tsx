import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import MenuLayout from '@/components/menu-layout/MenuLayout'
import routes from './routes'

function RouteWithSubRoutes (route: any) {
  return (
    <Route
      path={ route.path }
      render={ props => (
        // pass the sub-routes down to keep nesting
        <route.component { ...props } routes={ route.routes } />
      ) }
    />
  )
}

export default () => (
  <Router>
    <MenuLayout>
      <Switch>
        <Redirect from='/' to='/login' exact />
        {
          routes.map((route, i) => (
            <RouteWithSubRoutes key={ i } { ...route } />
          ))
        }
      </Switch>
    </MenuLayout>
  </Router>
)
