import React, { Component } from 'react'
import firebase from 'APP/fire'
import { browserHistory } from 'react-router'

export default class Rooms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currRoom: {}
    }
  }

  componentDidMount() {
    const allRooms = firebase.database().ref('rooms/')
    allRooms.on('value', snapshot => {
      const currRoom = Object.keys(snapshot.val()).map((room) => ({[room]: snapshot.val()[room]})).find((room) => room[this.props.params.roomId])
      this.setState({currRoom})
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
    const roomId = this.props.params.roomId
    const activeRoom = this.state.currRoom[roomId]
    return (
      <div>
        <h1>Game Room</h1>
        {
          activeRoom && activeRoom.potentialPlayers && activeRoom.potentialPlayers.map(player => (<h3 key={player.userId}>{player.displayName}</h3>))
        }
        <button onClick={this.onClickNewGame}> Start New Game </button>
      </div>
    )
  }
}
