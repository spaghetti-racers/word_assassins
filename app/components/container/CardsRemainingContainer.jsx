import React, { Component } from 'react'
import firebase from 'APP/fire'
import CardsRemaining from '../presentational/CardsRemaining.jsx'

export default class CardsRemainingContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redTeamNumCards: this.props.numCardsLeft.red,
      blueTeamNumCards: this.props.numCardsLeft.blue
    }
    //this.setNumCards = this.setNumCards.bind(this)
  }

  componentDidMount() {
    const dataRef = firebase.database().ref()
    const numCardsLeft = dataRef.child('numCardsLeft')
    numCardsLeft.on('value', (snap) => {
      const arrayOfTeamNames = Object.keys(snap.val())
      for (let i = 0; i < arrayOfTeamNames.length; i++) {
        numCardsLeft.child(arrayOfTeamNames[i]).on('value', (snap) => {
          this.setState({
            [arrayOfTeamNames[i]]: snap.val()
          })
        })
      }
    })
  }

  render() {
    return (
      <CardsRemaining numCardsLeftRed={this.state.redTeamNumCards} numCardsLeftBlue={this.state.blueTeamNumCards}/>
    )
  }
}
