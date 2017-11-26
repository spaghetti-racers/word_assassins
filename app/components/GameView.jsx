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
      allWords: []
    }
  }

  componentDidMount() {
    const allWords = firebase.database().ref('words/')
    allWords.on('value', snapshot => {
      const wordArray = snapshot.val()
      this.setState({allWords: wordArray})
    })
    const currentGameStatus = firebase.database().ref(`gameInstances/${this.props.params.gameId}/currentGameStatus`)
    currentGameStatus.on('value', snapshot => {
      this.setState({currentGameStatus: snapshot.val()})
    })
  }

  render() {
    return (
      <div>
      <Scoreboard gameId={this.props.params.gameId}/>
      {
        Object.keys(this.state).length >= 2 &&
        <BoardContainer
          allWords={this.state.allWords}
          currentGameStatus={this.state.currentGameStatus}
          gameId={this.props.params.gameId}
        />
      }
      <ActiveSpyMasterHinterContainer gameid={this.props.params.gameId}/>
      <InactiveSpyMasterHinterContainer gameid={this.props.params.gameId}/>
      </div>
    )
  }
}
