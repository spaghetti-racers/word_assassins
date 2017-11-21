import React, {Component} from 'react'
import firebase from 'APP/fire'

export default class ActiveSpymasterHint extends Component {
  constructor() {
    super()
    this.state = {
      numberOfWordsToGuess: '',
      possibleHint: ''
    }
    this.handlePossibleHint = this.handlePossibleHint.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.submitPotentialHint = this.submitPotentialHint.bind(this)
  }
  handlePossibleHint(event, data) {
    this.setState({
      possibleHint: event.target.value
    }, () => {
      console.log(this.state.possibleHint)
    })
  }
  handleNumberChange(event) {
    this.setState({
      numberOfWordsToGuess: +event.target.value
    }, () => {
      console.log('this is the state ', this.state)
    })
  }
  submitPotentialHint() {
    let numOfguesses = this.state.numberOfWordsToGuess + 1
    const dataRef = firebase.database().ref()
    dataRef.child('potentialHintandNumOfWords').set({
      numberOfWordsToGuess: numOfguesses,
      possibleHint: this.state.possibleHint
    })
    this.setState({
      numberOfWordsToGuess: '',
      possibleHint: ''
    })
  }
  render() {
    return (
      <div>
        <h1>Display Spymaster hint </h1>
        <div className="ui input">
          <input value={this.state.numberOfWordsToGuess} onChange={this.handleNumberChange} type="number" placeholder="enter a number" required/>
          <input value={this.state.possibleHint} onChange={this.handlePossibleHint} type="text" placeholder="enter a hint"/>
          <button
            disabled={this.state.possibleHint.length<=2 || this.state.numberOfWordsToGuess<1}
            onClick = {this.submitPotentialHint}
            className="ui button"
          >
          Confirm hint
          </button>

        </div>
      </div>
    )
  }
}
