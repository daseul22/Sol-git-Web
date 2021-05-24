import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from '@/pages/MainPage'
import MainRouter from '@/routers/MainRouter'

function AppRouter (): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <MainRouter/>
      </Switch>
    </Router>
  )
}

export default AppRouter
