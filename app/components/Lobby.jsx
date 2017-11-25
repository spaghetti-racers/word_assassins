import React, { Component } from 'react'
import firebase from 'APP/fire'
import { browserHistory } from 'react-router'

export default class Lobby extends Component {
  // CREATES A NEW GAME INSTANCE AND HAS ACCESS TO THE KEY
  onClickNewGame(event, data) {
    event.preventDefault()
    const newGameInstance = {
      currentGameStatus: {roundActive: false, whoGoesFirst: 'blueTeam'}
    }
    const newGameRef = firebase.database().ref('/gameInstances').push(newGameInstance)
    const newGameKey = newGameRef.key
    newGameRef.then(() => browserHistory.push(`/game-view/${newGameKey}/wordassassins`))
  }

  render() {
    return (
      <div>
       <button onClick={this.onClickNewGame}>Start New Game</button>
      </div>
    )
  }
}
