import React from 'react'
import {Link} from 'react-router'
import {getGamesList} from '../utils/helpers'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      gamesList: []
    }
  }
  componentDidMount(){
    getGamesList().then((data)=>
      this.setState({gamesList: data.data})
    )
  }
  render(){
    return (
      <div>
        <div className="page-header">
          <h1>Provably Fair Casino Games</h1>
        </div>
        <ul>
        {this.state.gamesList.map((game, index) => (
          <li key={game.key}>
            <Link to={`/play/${game.key}`}>{game.name}</Link>
          </li>
        ))}
        </ul>
      </div>
    )
  } 
}

export default Home