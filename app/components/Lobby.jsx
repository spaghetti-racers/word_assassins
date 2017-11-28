import React, { Component } from 'react'
import firebase from 'APP/fire'
import { browserHistory } from 'react-router'

export default class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: []
    }
  }

  componentDidMount() {
    const allRooms = firebase.database().ref('rooms/')
    allRooms.on('value', snapshot => {
      const rooms = Object.keys(snapshot.val()).map((room) => ({[room]: snapshot.val()[room]}))
      this.setState({rooms: rooms})
    })
  }

  // CREATES A NEW ROOM INSTANCE AND HAS ACCESS TO THE KEY
  onClickNewGame(event, data) {
    event.preventDefault()
    const auth = firebase.auth()
    const newRoomInstance = {
      potentialPlayers: {
        0: auth.currentUser.uid
      }
    }
    const newRoomRef = firebase.database().ref('rooms').push(newRoomInstance)
    const newRoomKey = newRoomRef.key
    const selectedUser = firebase.database().ref(`users/${auth.currentUser.uid}`)
    selectedUser.set({ room: newRoomKey })
    newRoomRef.then(() => {
      selectedUser.set({ room: newRoomKey })
      browserHistory.push(`/rooms/${newRoomKey}/wordassassins`)
    })
  }

  // PLAYER JOINS AN EXISTING ROOM INSTANCE
  onClickJoinGame(event, roomId) {
    event.preventDefault()
    const auth = firebase.auth()
    const currRoom = this.state.rooms.find((room) => room[roomId])
    const playerNum = currRoom[roomId]['potentialPlayers'].length

    const potentialPlayerRef = firebase.database().ref(`/rooms/${roomId}/potentialPlayers/`)
    const addPlayer = potentialPlayerRef.update({[playerNum]: auth.currentUser.uid})

    const selectedUser = firebase.database().ref(`users/${auth.currentUser.uid}`)
    selectedUser.set({ room: roomId })

    browserHistory.push(`/rooms/${roomId}/wordassassins`)
  }

  render() {
    return (
      <div>
      <h2>Lobby</h2>
      <button onClick={this.onClickNewGame}>Create New Room</button>
        <ul>
        {
          // RENDERS EACH ROOM IN THE ROOMS DB WITH A ROOM #, NUM OF PLAYERS IN ROOM, AND A JOIN BUTTON
          this.state.rooms.length && this.state.rooms.map((room, index) => {
            const roomId = Object.keys(room)[0]
            const potentialPlayers = room[roomId]['potentialPlayers']
            return (potentialPlayers.length <= 3) ? (<li key={roomId}>
                Room {index} - Players {potentialPlayers.length} /4
                <button onClick={(event) => this.onClickJoinGame(event, roomId)}>Join</button>
              </li>) : ''
          })
        }
        </ul>
      </div>
    )
  }
}
