import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Feeds from '@pages/feeds'
import Home from '@pages/home'
import React from 'react'
import routePath from '@routes/path'

type Props = {

}
export default function Root(props: Props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routePath.HOME} exact component={Home} />
        <Route path={routePath.FEEDS} component={Feeds} />
      </Switch>
    </BrowserRouter>
  )
}
