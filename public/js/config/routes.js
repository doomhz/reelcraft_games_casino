import React from 'react'
import Main from '../components/Main'
import Home from '../components/Home'
import {Route} from 'react-router'
import {IndexRoute} from 'react-router'

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Home} />
  </Route>
)