import React, { Component } from 'react'
import firebase from 'APP/fire'
import { browserHistory } from 'react-router'

export default class Rooms extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // this.onClickNewGame = this.onClickNewGame.bind(this)
  }

  onClickNewGame(event, data) {
    event.preventDefault()
    const newGameInstance = {
      currentGameStatus: {
        roundActive: false,
        whoGoesFirst: 'blueTeam',
        activeTeam: 'blueTeam'
      },

      players: {
        player0: {
          playerId: '0ABC',
          teamColor: 'redTeam',
          role: 'spymaster'
        },
        player1: {
          playerId: '1ABC',
          teamColor: 'redTeam',
          role: 'guesser'
        },
        player2: {
          playerId: '2ABC',
          teamColor: 'blueTeam',
          role: 'spymaster'
        },
        player3: {
          playerId: '3ABC',
          teamColor: 'blueTeam',
          role: 'guesser'
        }
      }
    }
    const newGameRef = firebase.database().ref('/gameInstances').push(newGameInstance)
    const newGameKey = newGameRef.key
    newGameRef.then(() => browserHistory.push(`/game-view/${newGameKey}/wordassassins`))
  }

  render() {
    return (
      <div>
        You have entered a ROOM!!!
        <button onClick={this.onClickNewGame}> Start New Game </button>
      </div>
    )
  }
}
