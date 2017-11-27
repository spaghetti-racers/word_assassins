import React, { Component } from 'react'
import firebase from 'APP/fire'
import DisplayHint from '../presentational/DisplayHint.jsx'

export default class DisplayHintContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hintToDisplay: '',
      numOfWordGuesses: ''
    }
  }

  componentDidMount() {
    const hint = firebase.database().ref(`gameInstances/${this.props.gameId}/currentGameStatus/displayHint`)

    hint.on('value', snap => {
      this.setState(snap.val())
    })
  }

  render() {
    return (
      <DisplayHint hintWord={this.state.hintToDisplay} hintNumGuessesAllowed={this.state.numOfWordGuesses} />
    )
  }
}
