import React, {Component} from 'react'
import firebase from 'APP/fire'

export default class DisabledSpymasterHint extends Component {
  constructor() {
    super()
    this.state = {
      numberOfWordsToGuess: '',
      possibleHint: ''
    }
  }

  componentDidMount() {
    this.checkIfTheresAHint()
  }

  checkIfTheresAHint() {
    const dataRef = firebase.database().ref()
    dataRef.child('potentialHintandNumOfWords').on('value', snap => {
      if (snap.val()=== null) {
        this.setState({
          numberOfWordsToGuess: '',
          possibleHint: ''})
      } else {
        this.setState(snap.val())
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Confirm Hint</h1>
        {
          !this.state.possibleHint?<h3>Waiting for Spymaster to Submit A Hint</h3>:
          <h3>The word to use as a hint is {this.state.possibleHint} </h3>
        }
      </div>
    )
  }
}
