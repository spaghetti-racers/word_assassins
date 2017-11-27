import React, { Component } from 'react'
import firebase from 'APP/fire'

import Scoreboard from '../presentational/Scoreboard.jsx'

export default class ScoreboardContainer extends Component {
  constructor() {
    super()
    this.state = {
      redTeamRoundsWon: 0,
      blueTeamRoundsWon: 0,

      redTeamNumCardsLeft: 8,
      blueTeamNumCardsLeft: 9,

      hintToDisplay: 'blank',
      numOfWordGuesses: 2

    }
    this.setNumCards = this.setNumCards.bind(this)
    this.setRoundsWon = this.setRoundsWon.bind(this)
    this.displayHint = this.displayHint.bind(this)
  }

  componentDidMount() {
    const gameId = this.props.gameId
    const hintFake = { hintToDisplay: this.state.hintToDisplay, numOfWordGuesses: this.state.numOfWordGuesses }
    this.displayHint(hintFake, gameId)

    const FakeRoundsWonByTeams = { red: this.state.redTeamRoundsWon, blue: this.state.blueTeamRoundsWon }

    this.setRoundsWon(FakeRoundsWonByTeams, gameId)

    const numCardsRemainingFake = { red: this.state.redTeamNumCardsLeft, blue: this.state.blueTeamNumCardsLeft }
    this.setNumCards(numCardsRemainingFake, gameId)

  }
  displayHint(hint, gameId) {
    const dataRef = firebase.database().ref()
    const gameInstance = dataRef.child('gameInstances').child(gameId).child('currentGameStatus').child('displayHint')
    gameInstance.set({
      hintToDisplay: hint.hintToDisplay,
      numOfWordGuesses: hint.numOfWordGuesses
    })
  }
  setNumCards(cardsObject, gameId) {
    const dataRef = firebase.database().ref()
    const gameInstance = dataRef.child('gameInstances').child(gameId).child('currentGameStatus').child('cardsRemaining')
    gameInstance.set({
      redTeamNumCardsLeft: cardsObject.red,
      blueTeamNumCardsLeft: cardsObject.blue
    })
  }

  setRoundsWon(roundsWonObject, gameId) {
    const dataRef = firebase.database().ref()
    const gameInstance = dataRef.child('gameInstances').child(gameId).child('currentGameStatus').child('RoundsWonByTeams')

    gameInstance.set({
      redTeamNumRoundsWon: roundsWonObject.red,
      blueTeamNumRoundsWon: roundsWonObject.blue
    })
  }

  render() {
    return (
      <Scoreboard roundsWonRedTeam={this.state.redTeamRoundsWon} roundsWonBlueTeam={this.state.blueTeamRoundsWon} gameId={this.props.gameId} currentGameStatus={this.props.currentGameStatus}/>
    )
  }
}
