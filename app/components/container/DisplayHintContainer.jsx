import React, { Component } from 'react'
import firebase from 'APP/fire'
import DisplayHint from '../presentational/DisplayHint.jsx'

export default class DisplayHintContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      word: this.props.hint.word,
      numGuessesAllowed: this.props.hint.numGuessesAllowed
    }
  }

  componentDidMount() {
    const dataRef = firebase.database().ref();
    const gameInstance = dataRef.child('gameInstances').child(this.props.gameId).child('currentGameStatus').child('displayHint')
    gameInstance.on('value', (snap) => {
      const arrayHint = Object.keys(snap.val())
      for (let i = 0; i < arrayHint.length; i++) {
        gameInstance.child(arrayHint[i]).on('value', (snap) => {
          this.setState({
            [arrayHint[i]]: snap.val()
          })
        })
      }
    })
  }

  render() {
    return (
      <DisplayHint hintWord={this.state.word} hintNumGuessesAllowed={this.state.numGuessesAllowed} />
    )
  }
}
