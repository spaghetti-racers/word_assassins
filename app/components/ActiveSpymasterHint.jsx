import React, {Component} from 'react'
import firebase from 'APP/fire'

export default class ActiveSpymasterHint extends Component {
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
  render() {
    if (this.state.hintApproval === false) console.log(' read hint approval')
    return (
      <div>
        <h1>Display Spymaster hint </h1>
      <div className="ui input">
          <input value={this.state.numberOfWordsToGuess} onChange={this.handleNumberChange} type="number" placeholder="enter a number" required disabled={this.state.hintApproval? 'disabled': null}/>
          <input value={this.state.possibleHint} onChange={this.handlePossibleHint} type="text" placeholder="enter a hint" disabled={this.state.hintApproval? 'disabled': null} />
          <button
            disabled={this.state.possibleHint.length<=2 || this.state.numberOfWordsToGuess<1}
            onClick = {this.submitPotentialHint}
            className="ui button"
          >
          Confirm hint
          </button>
          <button disabled={!this.state.hintApproval? 'disabled' : null}>Submit Hint</button>
        </div>
      </div>
    )
  }
}
