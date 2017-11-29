import React, { Component } from 'react'
import firebase from 'APP/fire'
import BoardContainer from './container/BoardContainer'
import Scoreboard from './container/ScoreboardContainer.jsx'
import ActiveSpyMasterHinterContainer from './container/ActiveSpyMasterHinterContainer'
import InactiveSpyMasterHinterContainer from './container/InactiveSpymasterHinterContainer'
export default class GameView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allWords: [],
      userId: ''
    }
  }

  componentDidMount() {
    const allWords = firebase.database().ref('words/')
    allWords.on('value', snapshot => {
      const wordArray = snapshot.val()
      this.setState({allWords: wordArray})
    })
    const currentGameStatus = firebase.database().ref(`gameInstances/${this.props.params.gameId}`)
    currentGameStatus.on('value', snapshot => {
      this.setState({currentGameStatus: snapshot.val().currentGameStatus, players: snapshot.val().players})

      const auth = firebase.auth()
      const currentUser = auth.currentUser.uid
      this.setState({userId: currentUser})

      const players = Object.keys(this.state.players)
      console.log('these are the players on state ', players)
      players.forEach(player => {
          if (this.state.players[player].playerId === this.state.userId) {
            // role = obj[player].role
              this.setState({role: this.state.players[player].role, team: this.state.players[player].teamColor})
            // teamColor = obj[player].teamColor
            console.log('current player is ', this.state.userId)
            console.log('the state is ', this.state)
          }
        })
    })



    // const players = this.state.players?Object.keys(this.state.players) : 'no players'



    // const currentPlayer = players?players.forEach(player => {
    //   if (this.state.players[player].playerId === this.state.userId) {
    //     // role = obj[player].role
    //     // teamColor = obj[player].teamColor
    //     console.log('current player is ', this.state.userId)
    //   }
    // }): 'no current player'
    // this.setState({ role: role, teamColor: teamColor })
  }

  render() {
    return (
      <div>
        <h1 className="title">Word Assassins</h1>
        <Scoreboard
          gameId={this.props.params.gameId}
          currentGameStatus={this.state.currentGameStatus}
          players={this.state.players}
        />
      {
        Object.keys(this.state).length >= 6 &&
        <div>
          <BoardContainer
          allWords={this.state.allWords}
          currentGameStatus={this.state.currentGameStatus}
          gameId={this.props.params.gameId}
          players={this.state.players}
          userId={this.state.userId}
          />

          {this.state.currentGameStatus.activeTeam===this.state.team?
          <ActiveSpyMasterHinterContainer
            currentGameStatus={this.state.currentGameStatus}
            gameId={this.props.params.gameId}
            players={this.state.players}
            />
          :
          <InactiveSpyMasterHinterContainer
            currentGameStatus={this.state.currentGameStatus}
            gameId={this.props.params.gameId}
            players={this.state.players}
          />}
        </div>
      }
      </div>
    )
  }
}
