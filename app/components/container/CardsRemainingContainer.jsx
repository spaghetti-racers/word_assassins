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
    //this.setNumCards = this.setNumCards.bind(this)
  }

  componentDidMount() {
    const dataRef = firebase.database().ref()
    const gameInstance = dataRef.child('gameInstances').child(this.props.gameId).child('currentGameStatus').child('cardsRemaining')
    //const numCardsLeft = dataRef.child('numCardsLeft')
    gameInstance.on('value', (snap) => {
      const arrayOfTeamNames = Object.keys(snap.val())
      for (let i = 0; i < arrayOfTeamNames.length; i++) {
        gameInstance.child(arrayOfTeamNames[i]).on('value', (snap) => {
          this.setState({
            [arrayOfTeamNames[i]]: snap.val()
          })
        })
      }
    })
  }

  render() {
    console.log("Cards STATE: ", this.state)
    return (
      <CardsRemaining numCardsLeftRed={this.state.redTeamNumCardsLeft} numCardsLeftBlue={this.state.blueTeamNumCardsLeft}/>
    )
  }
}
