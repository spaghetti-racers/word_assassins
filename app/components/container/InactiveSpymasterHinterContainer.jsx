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
    const dataRef = firebase.database().ref()
    dataRef.child('potentialHintandNumOfGuesses').on('value', snap => {
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
    firebase.database().ref(`gameInstances/${this.props.gameid}/potentialHintandNumOfGuesses/hintApproval`).update({hintApproval: true})
  }

  render() {
    return (
      <InactiveSpymasterHinter
        possibleHint={this.state.possibleHint}
        numberOfWordsToGuess={this.state.numberOfWordsToGuess}
        validateHint={this.validateHint}
      />
    )
  }
}
