import React, { Component } from 'react'
import firebase from 'APP/fire'

import Scoreboard from '../presentational/Scoreboard.jsx'

export default class ScoreboardContainer extends Component {
  constructor() {
    super()
    this.state = {
      redTeamRoundsWon: 1,
      blueTeamRoundsWon: 1,

      redTeamNumCards: 8,
      blueTeamNumCards: 9,
      word: 'blank',
      numGuessesAllowed: 2

    }
    this.setNumCards = this.setNumCards.bind(this)
    this.setRoundsWon = this.setRoundsWon.bind(this)
    this.displayHint = this.displayHint.bind(this)
  }

  componentDidMount() {

    const hintFake = { word: 'cat', numGuessesAllowed: 5 }
    this.displayHint(hintFake)
    this.setState({ word: 'Carmen', numGuessesAllowed: 17 })

    const FakeRoundsWonByTeams = { red: 30, blue: 20 }
    this.setRoundsWon(FakeRoundsWonByTeams)
    this.setState({ redTeamRoundsWon: 5, blueTeamRoundsWon: 6 })

    const numCardsRemainingFake = { red: 40, blue: 10 }
    this.setNumCards(numCardsRemainingFake)
    this.setState({ redTeamNumCards: numCardsRemainingFake.red, blueTeamNumCards: numCardsRemainingFake.blue })

  }
  displayHint(hint) {
    console.log("HINTT", hint)
    const dataRef = firebase.database().ref()
    const hintToDisplay = dataRef.child('displayHint')
    hintToDisplay.set({
      word: hint.word,
      numTurns: hint.numGuessesAllowed
    })
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
      <Scoreboard />
    )
  }
}
