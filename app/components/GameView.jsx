import React, { Component } from 'react'
import firebase from 'APP/fire'
import GameCreator from './GameCreator'

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
  }

  render() {
    return (
      <div>
        Game View
        {this.state.allWords.length && <GameCreator allWords={this.state.allWords} whoGoesFirst={'blueTeam'} gameId={this.props.params.gameId} />}
      </div>
    )
  }
}
