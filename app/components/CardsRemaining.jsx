import React, {Component} from 'react'
import firebase from 'APP/fire'

export default class CardsRemaining extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redTeamNumCards: 0,
      blueTeamNumCards: 0,
    }
    this.setNumCards = this.setNumCards.bind(this)
  }

  componentDidMount() {
    this.setNumCards(this.props.numCardsLeft)
  }

  setNumCards(cardsObject) {
    const dataRef = firebase.database().ref()
    const numCardsLeft = dataRef.child('numCardsLeft')
    numCardsLeft.set({
      redTeamNumCardsLeft: cardsObject.red,
      blueTeamNumCardsLeft: cardsObject.blue
    })
  }

  render() {
    return (
      <div>
        <h2>Cards Remaining</h2>
        <h6>Blue team: </h6>
        <h6>Red team: </h6>
      </div>
    )
  }
}
