import React, { Component } from 'react'
import firebase from 'APP/fire'

import Scoreboard from '../presentational/Scoreboard.jsx'

export default class ScoreboardContainer extends Component {
  constructor() {
    super()
    this.state = {
      redTeamRoundsWon: 0,
      blueTeamRoundsWon: 0,

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

    const FakeRoundsWonByTeams = { red: this.state.redTeamRoundsWon, blue: this.state.blueTeamRoundsWon }

    const gameId = this.props.gameId
    this.setRoundsWon(FakeRoundsWonByTeams, gameId)
    //this.setState({ redTeamRoundsWon: 5, blueTeamRoundsWon: 6 })

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

  setRoundsWon(roundsWonObject, gameId) {
    console.log("!!!!!!!!!!", gameId)
    // this.setState({ redTeamNumCards: cardsObject.red, blueTeamNumCards: cardsObject.blue })
    const dataRef = firebase.database().ref()
    const gameInstance = dataRef.child('gameInstances').child(gameId).child('currentGameStatus').child('RoundsWonByTeams')
    //const roundsWon = dataRef.child('currentGameStatus').child('RoundsWonByTeams')

    console.log("redTeam: ", roundsWonObject.red)
      console.log("blueTeam: ", roundsWonObject.blue)
      console.log("object: ", roundsWonObject)
    gameInstance.set({
      redTeamNumRoundsWon: roundsWonObject.red,
      blueTeamNumRoundsWon: roundsWonObject.blue
    })
    console.log('heyHello')
  }

  render() {
    return (
      <Scoreboard roundsWonRedTeam = {this.state.redTeamRoundsWon} roundsWonBlueTeam = {this.state.blueTeamRoundsWon} />
    )
  }
}
