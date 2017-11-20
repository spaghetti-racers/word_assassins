import React, {Component} from 'react'
import firebase from 'APP/fire'
import CardsRemaining from './CardsRemaining'
export default class Scoreboard extends Component {
  constructor() {
    super()
    this.state = {
      redTeam: 0,
      blueTeam: 0,
    }
  }

  componentDidMount() {
    const dataRef = firebase.database().ref()
    const teams = dataRef.child('teams')
    const numCardsLeft = dataRef.child('numCardsLeft');
    teams.set({
      redTeam: 5,
      blueTeam: 3
    })
    numCardsLeft.set({
      redTeamNumCardsLeft: 8,
      blueTeamNumCardsLeft: 9
    })
  }

  render() {
    return (
      <div>
        <h2>Rounds Won</h2>
        <h6>Blue team: </h6>
        <h6>Red team: </h6>
        <CardsRemaining numCardsLeft={{red: 0}}/>
      </div>
    )
  }
}
