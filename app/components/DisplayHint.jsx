import React, {Component} from 'react'
import firebase from 'APP/fire'
import { Grid } from 'semantic-ui-react'

export default class DisplayHint extends Component {
  constructor(props) {
    super(props)
    this.state = {
      word: this.props.hint.word,
      numGuessesAllowed: this.props.hint.numGuessesAllowed
    }
    //this.setNumCards = this.setNumCards.bind(this)
  }

  componentDidMount() {
    const dataRef = firebase.database().ref();
    const hint = dataRef.child('displayHint')
    hint.on('value', (snap) => {
      const arrayHint = Object.keys(snap.val())
      for(let i = 0; i < arrayHint.length; i++ ) {
        hint.child(arrayHint[i]).on('value', (snap) => {
          this.setState({
            [arrayHint[i]]: snap.val()
          })
        })
      }
    })
  }

  render() {
    console.log('our props ', this.props.numCardsLeft)
    return (
      <div>
        <h4>display hint</h4>
        <h6>Word: {this.props.hint.word}</h6>
        <h6>Number of Guesses Allowed: {this.props.hint.numGuessesAllowed}</h6>
      </div>
    )
  }
}
