import React, {Component} from 'react'
import firebase from 'APP/fire'
import {Button} from 'semantic-ui-react'
import InactiveSpymasterHinter from '../presentational/InactiveSpymasterHinter'

export default class InactiveSpymasterHinterContainer extends Component {
  constructor() {
    super()
    this.state = {
      numberOfWordsToGuess: '',
      possibleHint: ''
    }
    this.validateHint = this.validateHint.bind(this)
  }

  componentDidMount() {
    this.checkIfTheresAHint()
  }

  checkIfTheresAHint() {
    firebase.database().ref(`gameInstances/${this.props.gameId}/currentGameStatus/potentialHintandNumOfGuesses/hintApproval`).on('value', snap => {
      if (snap.val()=== null) {
        this.setState({
          numberOfWordsToGuess: '',
          possibleHint: ''})
      } else {
        this.setState(snap.val())
      }
    })
  }

  validateHint() {
    firebase.database().ref(`gameInstances/${this.props.gameId}/currentGameStatus/potentialHintandNumOfGuesses/hintApproval`).update({hintApproval: true})
    firebase.database().ref(`gameInstances/${this.props.gameId}/currentGameStatus`).update({activeRole: 'activeSpymaster'})
  }

  render() {
    return (
      <InactiveSpymasterHinter
        possibleHint={this.state.possibleHint}
        numberOfWordsToGuess={this.state.numberOfWordsToGuess}
        validateHint={this.validateHint}
        role={this.props.role}
      />
    )
  }
}
