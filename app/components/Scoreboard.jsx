import React, {Component} from 'react'
import firebase from 'APP/fire'
import CardsRemaining from './CardsRemaining'
import RoundsWon from './RoundsWon'
export default class Scoreboard extends Component {
  constructor() {
    super()
    this.state = {
      redTeamRoundsWon: 1,
      blueTeamRoundsWon: 1,

      redTeamNumCards: 8,
      blueTeamNumCards: 9
    }
    this.setNumCards = this.setNumCards.bind(this)
    this.setRoundsWon = this.setRoundsWon.bind(this)
  }

  componentDidMount() {

    const FakeRoundsWonByTeams = {red: 30, blue: 20}
    this.setRoundsWon(FakeRoundsWonByTeams)
    this.setState({redTeamRoundsWon: FakeRoundsWonByTeams.red, blueTeamRoundsWon: FakeRoundsWonByTeams.blue})

    const numCardsRemainingFake = {red: 40, blue: 10}
    this.setNumCards(numCardsRemainingFake)
    this.setState({redTeamNumCards: numCardsRemainingFake.red, blueTeamNumCards: numCardsRemainingFake.blue})
  }

  setNumCards(cardsObject) {
    const dataRef = firebase.database().ref()
    const numCardsLeft = dataRef.child('numCardsLeft')
    numCardsLeft.set({
      redTeamNumCardsLeft: cardsObject.red,
      blueTeamNumCardsLeft: cardsObject.blue
    })
  }

  setRoundsWon(roundsWonObject) {
    console.log("!!!!!!!!!!mi gente")
    // this.setState({ redTeamNumCards: cardsObject.red, blueTeamNumCards: cardsObject.blue })
    const dataRef = firebase.database().ref()
    const roundsWon = dataRef.child('RoundsWonByTeams')
    roundsWon.set({
      redTeamNumRoundsWon: roundsWonObject.red,
      blueTeamNumRoundsWon: roundsWonObject.blue
    })
  }

  render() {
    return (
      <div>
        <RoundsWon roundsWonByTeams = {{red: this.state.redTeamRoundsWon, blue: this.state.blueTeamRoundsWon}} />

        <CardsRemaining numCardsLeft={{red: this.state.redTeamNumCards, blue: this.state.blueTeamNumCards}}/>
      </div>
    )
  }
}
