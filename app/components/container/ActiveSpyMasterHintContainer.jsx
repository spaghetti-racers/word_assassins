import React, {Component} from 'react'
import firebase from 'APP/fire'
import ActiveSpymasterHint from '../presentational/ActiveSpymasterHint.jsx'

export default class ActiveSpymasterHintContainer extends Component {
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
    const dataRef = firebase.database().ref()
    const hintApproval = dataRef.child('potentialHintandNumOfWords').child('hintApproval')
    hintApproval.on('value', snap => {
      this.setState({hintApproval: snap.val()})
      console.log('This is the value of snap ', snap.val())
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
    const dataRef = firebase.database().ref()
    dataRef.child('potentialHintandNumOfWords').set({
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
    const dataRef = firebase.database().ref()
    const hintGen = dataRef.child('potentialHintandNumOfWords').update({hintApproval: null, numberOfWordsToGuess: null, possibleHint: null})
  }

  render() {
    return (
      <ActiveSpymasterHint
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
