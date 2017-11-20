import React, {Component} from 'react'
import firebase from 'APP/fire'

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
    teams.set({
      redTeam: 0,
      blueTeam: 0
    })
  }

  render() {
    return (
      <div>
        <h2>Rounds Won</h2>
        <h6>Blue team: </h6>
        <h6>Red team: </h6>
      </div>
    )
  }
}
