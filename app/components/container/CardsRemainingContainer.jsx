import React, { Component } from 'react'
import firebase from 'APP/fire'
import CardsRemaining from '../presentational/CardsRemaining.jsx'

export default class CardsRemainingContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redTeamNumCardsLeft: this.props.numCardsLeft.red,
      blueTeamNumCardsLeft: this.props.numCardsLeft.blue
    }
  }

  componentDidMount() {

    const dataRef = firebase.database().ref()
    const cardsRemaining = dataRef.child('gameInstances').child(this.props.gameId).child('currentGameStatus').child('cardsRemaining')
    const roundsWon = dataRef.child('gameInstances').child(this.props.gameId).child('currentGameStatus').child('RoundsWonByTeams')

    cardsRemaining.on('value', (snap) => {
      if(snap.val()) {
      const arrayOfTeamNames = Object.keys(snap.val())
      for (let i = 0; i < arrayOfTeamNames.length; i++) {
        cardsRemaining.child(arrayOfTeamNames[i]).on('value', (snap) => {
          this.setState({
            [arrayOfTeamNames[i]]: snap.val()
          })
        })
      }}
    })
  }

  render() {
    // console.log("!!redTeamCardsRemaining: ", this.state.redTeamNumCardsLeft)
    // console.log("!!blueTeamCardsRemaining: ", this.state.blueTeamNumCardsLeft)

    return (
      <CardsRemaining numCardsLeftRed={this.state.redTeamNumCardsLeft} numCardsLeftBlue={this.state.blueTeamNumCardsLeft} />
    )
  }
}
