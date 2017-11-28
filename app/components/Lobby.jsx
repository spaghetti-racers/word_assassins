import React, { Component } from 'react'
import firebase from 'APP/fire'
import { browserHistory } from 'react-router'

export default class Lobby extends Component {
  // CREATES A NEW GAME INSTANCE AND HAS ACCESS TO THE KEY
  componentDidMount() {
    // const auth = firebase.auth()
    // const authId = auth.W
    // console.log('auth is ', auth)
    // console.log('auth id is ', authId)
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('this is a user ', user.uid)
      } else {
        // No user is signed in.
      }
    })
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
          playerId: 'WSr2oCDZh9S37X24VnNLjNXpjsp1',
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
       <button onClick={this.onClickNewGame}>Start New Game</button>
      </div>
    )
  }
}
