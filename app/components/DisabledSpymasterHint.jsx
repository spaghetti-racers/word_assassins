import React, {Component} from 'react'
import firebase from 'APP/fire'
import {Button} from 'semantic-ui-react'
export default class DisabledSpymasterHint extends Component {
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

  validateHint() {
    firebase.database().ref('/potentialHintandNumOfWords').update({hintApproval: true})
  }

  render() {
    return (
      <div>
        <h1>Confirm Hint</h1>
        {
          !this.state.possibleHint?<h3>Waiting for Spymaster to Submit A Hint</h3>:
          <div>
            <h3>The word to use as a hint is {this.state.possibleHint} </h3>
            <h3>The number of guesses allowed is {this.state.numberOfWordsToGuess} </h3>
            <Button onClick={this.validateHint}>Validate</Button>
            <Button>Resubmit Hint</Button>
          </div>
        }
      </div>
    )
  }
}
