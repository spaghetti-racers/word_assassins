import React, { Component } from 'react'
import firebase from 'APP/fire'
import { browserHistory } from 'react-router'
import { Container, Header, Table, Button, Segment } from 'semantic-ui-react'

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

      if (currRoom[this.props.params.roomId].gameId) {
        browserHistory.push(`/game-view/${currRoom[this.props.params.roomId].gameId}/wordassassins`)
      }
    })
  }

  onClickNewGame(event, activeRoom) {
    event.preventDefault()
    const newGameInstance = {
      currentGameStatus: {
        roundActive: false,
        whoGoesFirst: 'blueTeam',
        activeTeam: 'blueTeam',
        activeRole: 'spymaster',
        roundWinner: 'none'
      },

      players: {
        player0: {
          playerId: activeRoom.potentialPlayers[0].userId,
          teamColor: 'redTeam',
          role: 'spymaster',
          name: activeRoom.potentialPlayers[0].displayName
        },
        player1: {
          playerId: activeRoom.potentialPlayers[1].userId,
          teamColor: 'redTeam',
          role: 'guesser',
          name: activeRoom.potentialPlayers[1].displayName
        },
        player2: {
          playerId: activeRoom.potentialPlayers[2].userId,
          teamColor: 'blueTeam',
          role: 'guesser',
          name: activeRoom.potentialPlayers[2].displayName
        },
        player3: {
          playerId: activeRoom.potentialPlayers[3].userId,
          teamColor: 'blueTeam',
          role: 'spymaster',
          name: activeRoom.potentialPlayers[3].displayName
        }
      }
    }
    const newGameRef = firebase.database().ref('/gameInstances').push(newGameInstance)
    const newGameKey = newGameRef.key
    const roomId = this.props.params.roomId
    const roomRef = firebase.database().ref(`/rooms/${roomId}`)
    newGameRef.then(() => {
      roomRef.update({gameId: newGameKey})
    })
  }

  render() {
    const roomId = this.props.params.roomId
    const activeRoom = this.state.currRoom[roomId]
    return (
      <div>
        <Segment centered style={{ textAlign: 'center', backgroundColor: '#76d66d' }} >
            <Container>
              <Header as='h2'>Game Room</Header>
              <p style={{paddingBottom: '10px'}}>Once you have four players in a room, you will be able to start a new game.
                                        Enjoy!</p>
              <Button centered positive style={{color: 'black', backgroundColor: 'white'}} disabled={(activeRoom && activeRoom.potentialPlayers.length < 4) || (activeRoom && activeRoom.potentialPlayers.length > 4)}
              onClick={(event) => this.onClickNewGame(event, activeRoom)}>
              Start New Game
              </Button>
            </Container>
          </Segment>
          <Table celled style={{ width: '50%', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'LightGoldenRodYellow' }}>
        {
          activeRoom && activeRoom.potentialPlayers && activeRoom.potentialPlayers.map((player, index) => (

            <Table.Row key={player.userId}>
              <Table.Cell>Player {index + 1}</Table.Cell>
              <Table.Cell>{player.displayName}</Table.Cell>

              </Table.Row>))
        }
        </Table>
      </div>
    )
  }
}
