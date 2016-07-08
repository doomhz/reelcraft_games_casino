import React from 'react'
import {Link, IndexLink} from 'react-router'
import {gamesList, createSession, closeSession} from '../utils/helpers'

class Game extends React.Component {
  constructor(props){
    super(props)
    this.integrationHost = globalParams.integrationHost
    this.gameName = this.props.params.game
    this.partnerUid = globalParams.partnerUid
    this.token = ""
  }
  componentDidMount(){
    this.unloadGame()
    createSession().then((data)=> {
      this.token = data.data.token
      this.loadGame()
    })
  }
  componentWillUnmount(){
    closeSession(this.token).then(()=> this.unloadGame())
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
    return `${this.integrationHost}/integration/game.js?game=${this.gameName}&partner_uid=${this.partnerUid}&token=${this.token}&integration_host=${this.integrationHost}`
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