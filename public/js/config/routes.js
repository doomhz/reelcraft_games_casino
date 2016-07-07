import React from 'react'
import Main from '../components/Main'
import Home from '../components/Home'
import Game from '../components/Game'
import {Route, IndexRoute} from 'react-router'
import {gamesList} from '../utils/helpers'

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Home} />
    {gamesList.map((game, index) => (
      <Route path={game.key} component={Game} key={game.key} />
    ))}
  </Route>
)