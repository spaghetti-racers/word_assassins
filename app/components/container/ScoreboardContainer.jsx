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

      word: 'blank',
      numGuessesAllowed: 2

    }
    this.setNumCards = this.setNumCards.bind(this)
    this.setRoundsWon = this.setRoundsWon.bind(this)
    this.displayHint = this.displayHint.bind(this)
  }

  componentDidMount() {
    const gameId = this.props.gameId
    const hintFake = { word: this.state.word, numGuessesAllowed: this.state.numGuessesAllowed }
    this.displayHint(hintFake, gameId)
    //this.setState({ word: 'Carmen', numGuessesAllowed: 17 })

    const FakeRoundsWonByTeams = { red: this.state.redTeamRoundsWon, blue: this.state.blueTeamRoundsWon }

    this.setRoundsWon(FakeRoundsWonByTeams, gameId)
    //this.setState({ redTeamRoundsWon: 5, blueTeamRoundsWon: 6 })

    const numCardsRemainingFake = { red: this.state.redTeamNumCardsLeft, blue: this.state.blueTeamNumCardsLeft }
    this.setNumCards(numCardsRemainingFake, gameId)
    //this.setState({ redTeamNumCards: numCardsRemainingFake.red, blueTeamNumCards: numCardsRemainingFake.blue })

  }
  displayHint(hint, gameId) {
    console.log("HINTT", hint)
    const dataRef = firebase.database().ref()
    //const hintToDisplay = dataRef.child('displayHint')
    const gameInstance = dataRef.child('gameInstances').child(gameId).child('currentGameStatus').child('displayHint')
    gameInstance.set({
      word: hint.word,
      numGuessesAllowed: hint.numGuessesAllowed
    })
  }
  setNumCards(cardsObject, gameId) {
    const dataRef = firebase.database().ref()
    //const numCardsLeft = dataRef.child('numCardsLeft')
    const gameInstance = dataRef.child('gameInstances').child(gameId).child('currentGameStatus').child('cardsRemaining')
    gameInstance.set({
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
      <Scoreboard roundsWonRedTeam={this.state.redTeamRoundsWon} roundsWonBlueTeam={this.state.blueTeamRoundsWon} gameId={this.props.gameId} />
    )
  }
}
