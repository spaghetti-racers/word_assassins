import React, { Component } from 'react'
import firebase from 'APP/fire'
import RoundsWon from '../presentational/RoundsWon.jsx'

export default class RoundsWonContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redTeamRoundsWon: this.props.roundsWonByTeams.red,
      blueTeamRoundsWon: this.props.roundsWonByTeams.blue
    }
    //this.setNumCards = this.setNumCards.bind(this)
  }

  componentDidMount() {
    const dataRef = firebase.database().ref()
    const roundsWon = dataRef.child('RoundsWonByTeams')
    roundsWon.on('value', (snap) => {
      const arrayOfTeamNames = Object.keys(snap.val())
      for (let i = 0; i < arrayOfTeamNames.length; i++) {
        roundsWon.child(arrayOfTeamNames[i]).on('value', (snap) => {
          this.setState({
            [arrayOfTeamNames[i]]: snap.val()
          })
        })
      }
    })
  }

  render() {
    return (
      <RoundsWon roundsWonByTeamsRed = {this.state.redTeamRoundsWon} roundsWonByTeamsBlue = {this.state.blueTeamRoundsWon}/>
    )
  }
}
