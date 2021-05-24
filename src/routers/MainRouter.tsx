import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Feed from '@/components/Feed'
import Repo from '@/pages/Repo'

function MainRouter (): JSX.Element {
  return (
    <MainLayout>
      <Router>
        <Switch>
          <Route path="/feed" component={Feed}/>
          <Route path="/repo/:userId" component={Repo}/>
        </Switch>
      </Router>
    </MainLayout>
  )
}

export default MainRouter
