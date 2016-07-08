import React from 'react'
import {Link, IndexLink} from 'react-router'
import {gamesList} from '../utils/helpers'

class Game extends React.Component {
  constructor(props){
    super(props)
    this.integrationHost = "https://reelcraftgames.com"
    this.gameName = this.props.params.game
    this.partnerUid = "766ac70c-0f7a-417d-b9fc-ad769020ca58"
    this.assetsHost = "https://reelcraftgames.com"
    this.env = "production"
  }
  componentDidMount(){
    this.unloadGame()
    this.loadGame()
  }
  componentWillUnmount(){
    this.unloadGame()
  }
  loadGame(){
    const script = document.createElement("script")
    script.src = this.getScriptPath()
    script.id = "reelcraft-game-scr"
    script.async = true
    document.getElementById("reelcraft-game-cnt").appendChild(script)
  }
  unloadGame(){
    let elements = document.getElementsByClassName("rcg-game-script")
    while (elements.length > 0) elements[0].parentNode.removeChild(elements[0])
    if (window.rcgGame) {
      try {
        window.rcgGame.close()
      } catch (e) {
        console.error("The games didn't close properly.", e)
      }
      window.rcgGame = undefined
    }
  }
  getScriptPath(){
    return `${this.integrationHost}/integration/game.js?game=${this.gameName}&partner_uid=${this.partnerUid}&integration_host=${this.integrationHost}`
  }
  render(){
    return (
      <div>
        <Link to="/">&larr; Back to games</Link>
        <div id="reelcraft-game-cnt"></div>
      </div>
    )
  } 
}

export default Game