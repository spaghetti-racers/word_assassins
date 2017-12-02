import React, { Component } from 'react'
import firebase from 'APP/fire'
import { browserHistory } from 'react-router'
import { Container, Header, Table, Button, Segment } from 'semantic-ui-react'

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
      const rooms = Object.keys(snapshot.val()).map((room) => ({ [room]: snapshot.val()[room] }))
      this.setState({ rooms: rooms })
    })
  }

  // CREATES A NEW ROOM INSTANCE AND HAS ACCESS TO THE KEY
  onClickNewGame(event, data) {
    event.preventDefault()
    const auth = firebase.auth()
    const newRoomInstance = {
      potentialPlayers: {
        0: { userId: auth.currentUser.uid, displayName: auth.currentUser.displayName }
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
    const addPlayer = potentialPlayerRef.update({ [playerNum]: { userId: auth.currentUser.uid, displayName: auth.currentUser.displayName } })

    const selectedUser = firebase.database().ref(`users/${auth.currentUser.uid}`)
    selectedUser.set({ room: roomId })

    browserHistory.push(`/rooms/${roomId}/wordassassins`)
  }

  render() {
    return (
      <div >
         <Segment centered style={{ textAlign: 'center', backgroundColor: 'DodgerBlue' }} >
          <Container  >
            <Header as='h2'>Welcome to the Word Assassins Lobby</Header>
            <p style={{paddingBottom: '10px'}}>To start playing Word Assassins please create or join a room.</p>
          </Container>

          <Button centered positive style={{color: 'black'}} onClick={this.onClickNewGame}>Create New Room</Button>
        </Segment>

          <Table celled style={{ width: "50%", textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'LightGoldenRodYellow' }}>
            {
              // RENDERS EACH ROOM IN THE ROOMS DB WITH A ROOM #, NUM OF PLAYERS IN ROOM, AND A JOIN BUTTON
              this.state.rooms.length && this.state.rooms.map((room, index) => {

                const roomId = Object.keys(room)[0]
                const potentialPlayers = room[roomId]['potentialPlayers']
                return (potentialPlayers.length <= 3) ? (

                  <Table.Row key={roomId}>
                    <Table.Cell>Room {index + 1}</Table.Cell>
                    <Table.Cell>Players {potentialPlayers.length} /4</Table.Cell>
                    <Table.Cell> <button onClick={(event) => this.onClickJoinGame(event, roomId)}>Join</button></Table.Cell>

                  </Table.Row>) : ''
              })
            }
          </Table>

      </div>
    )
  }
}
