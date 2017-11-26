import React, {Component} from 'react'
import firebase from 'APP/fire'
import ActiveSpymasterHinter from '../presentational/ActiveSpymasterHinter.jsx'

export default class ActiveSpymasterHinterContainer extends Component {
  constructor() {
    super()
    this.state = {
      numberOfWordsToGuess: '',
      possibleHint: '',
      hintApproval: false
    }
    this.handlePossibleHint = this.handlePossibleHint.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.submitPotentialHint = this.submitPotentialHint.bind(this)
    this.resetHintGenerator = this.resetHintGenerator.bind(this)
  }
  componentDidMount() {
    const hintApproval = firebase.database().ref(`gameInstances/${this.props.gameid}/currentGameStatus/potentialHintandNumOfGuesses/hintApproval`)
    hintApproval.on('value', snap => {
      this.setState({hintApproval: snap.val()})
    })
  }

  handlePossibleHint(event, data) {
    this.setState({
      possibleHint: event.target.value
    })
  }
  handleNumberChange(event) {
    this.setState({
      numberOfWordsToGuess: +event.target.value
    })
  }
  submitPotentialHint() {
    const numOfguesses = this.state.numberOfWordsToGuess + 1
    const submitHint = firebase.database().ref(`gameInstances/${this.props.gameid}/currentGameStatus/potentialHintandNumOfGuesses/hintApproval`)

    submitHint.set({
      numberOfWordsToGuess: numOfguesses,
      possibleHint: this.state.possibleHint,
      hintApproval: false
    })
    this.setState({
      numberOfWordsToGuess: '',
      possibleHint: ''
    })
  }

  resetHintGenerator() {
    firebase.database().ref(`gameInstances/${this.props.gameid}/currentGameStatus/potentialHintandNumOfGuesses/hintApproval`).update({hintApproval: null, numberOfWordsToGuess: null, possibleHint: null})
  }

  render() {
    return (
      <ActiveSpymasterHinter
      numberOfWordsToGuess={this.state.numberOfWordsToGuess}
      handleNumberChange={this.handleNumberChange}
      possibleHint={this.state.possibleHint}
      hintApproval={this.state.hintApproval}
      submitPotentialHint={this.submitPotentialHint}
      resetHintGenerator={this.resetHintGenerator}
      handlePossibleHint={this.handlePossibleHint}

       />
    )
  }
}
