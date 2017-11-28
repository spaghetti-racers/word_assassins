import React, { Component } from 'react'
import firebase from 'APP/fire'
import { browserHistory } from 'react-router'



export default class Lobby extends Component {
  componentDidMount() {
    const allRooms = firebase.database().ref('rooms/')
    allRooms.on('value', snapshot => {
      console.log('SNAP!!!!!!!!', snapshot.val())
      const rooms = Object.keys(snapshot.val()).map((room) => ({[room]: snapshot.val()[room]}))
      console.log('ROOMS--------', rooms)
    })
  }

  // CREATES A NEW ROOM INSTANCE AND HAS ACCESS TO THE KEY
  onClickNewGame(event, data) {
    event.preventDefault()
    const auth = firebase.auth()
    console.log('cur use', auth.currentUser.uid)
    const newRoomInstance = {
      potentialPlayers: {
        0: auth.currentUser.uid
      }
    }
    const newRoomRef = firebase.database().ref('/rooms').push(newRoomInstance)
    const newRoomKey = newRoomRef.key
    newRoomRef.then(() => browserHistory.push(`/rooms/${newRoomKey}/wordassassins`))
  }

  render() {
    return (
      <div>
       <button onClick={this.onClickNewGame}>Create Room</button>
      </div>
    )
  }
}
