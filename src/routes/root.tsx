import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Feeds from '@pages/feeds'
import React from 'react'
import routePath from '@routes/path'

type Props = {

}
export default function Root(props: Props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routePath.FEEDS} component={Feeds} />
      </Switch>
    </BrowserRouter>
  )
}
