import React from 'react'
import {Link} from 'react-router'
import {gamesList} from '../utils/helpers'

class Home extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        <div className="page-header">
          <h1>Reelcraft Games Casino</h1>
        </div>
        <ul>
        {gamesList.map((game, index) => (
          <li key={game.key}>
            <Link to={`/${game.key}`}>{game.name}</Link>
          </li>
        ))}
        </ul>
      </div>
    )
  } 
}

export default Home