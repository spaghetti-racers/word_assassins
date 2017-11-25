import React, { Component } from 'react'
import firebase from 'APP/fire'
import BoardContainer from './container/BoardContainer'

export default class GameView extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const allWords = firebase.database().ref('words/')
    allWords.on('value', snapshot => {
      const wordArray = snapshot.val()
      this.setState({allWords: wordArray})
      console.log('~~~~~~~~~~~~~', this.state)
    })
    const currentGameStatus = firebase.database().ref(`gameInstances/${this.props.params.gameId}/currentGameStatus`)
    currentGameStatus.on('value', snapshot => {
      this.setState({currentGameStatus: snapshot.val()})
      console.log('!!!!!!!!!!!!!!!!!!', Object.keys(this.state).length, this.state)
    })
  }

  render() {
    return (
      <div>
        {Object.keys(this.state).length >= 2 && this.state.currentGameStatus.roundActive ? <BoardContainer allWords={this.state.allWords} whoGoesFirst={'blueTeam'} gameId={this.props.params.gameId} /> : <div>A button will go here</div>}
      </div>
    )
  }
}
