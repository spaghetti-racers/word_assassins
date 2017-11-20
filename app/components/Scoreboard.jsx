import React, {Component} from 'react'
import firebase from 'APP/fire'
import CardsRemaining from './CardsRemaining'
export default class Scoreboard extends Component {
  constructor() {
    super()
    this.state = {
      redTeam: 0,
      blueTeam: 0,
      redTeamNumCards: 0,
      blueTeamNumCards: 0
    }
  }

  componentDidMount() {
    const dataRef = firebase.database().ref()
    const teams = dataRef.child('teams')
    const numCardsLeft = dataRef.child('numCardsLeft')
    teams.set({
      redTeam: 5,
      blueTeam: 3
    })
    numCardsLeft.set({
      redTeamNumCardsLeft: 6,
      blueTeamNumCardsLeft: 5
    })
  }

  render() {
    return (
      <div>
        <h2>Rounds Won</h2>
        <h6>Blue team: </h6>
        <h6>Red team: </h6>
        <CardsRemaining numCardsLeft={{red: this.state.redTeamNumCards, blue: this.state.blueTeamNumCards}}/>
      </div>
    )
  }
}
