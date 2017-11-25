import React, { Component } from 'react'
import firebase from 'APP/fire'
import RoundsWon from '../presentational/RoundsWon.jsx'

export default class RoundsWonContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redTeamNumRoundsWon: this.props.roundsWonByTeams.red,
      blueTeamNumRoundsWon: this.props.roundsWonByTeams.blue
    }
    //this.setNumCards = this.setNumCards.bind(this)
  }

  componentDidMount() {
    const dataRef = firebase.database().ref()
    const gameInstance = dataRef.child('gameInstances').child(this.props.gameId).child('currentGameStatus').child('RoundsWonByTeams')
    //const roundsWon = dataRef.child('RoundsWonByTeams')
    gameInstance.on('value', (snap) => {
      const arrayOfTeamNames = Object.keys(snap.val())
      for (let i = 0; i < arrayOfTeamNames.length; i++) {
        gameInstance.child(arrayOfTeamNames[i]).on('value', (snap) => {
          this.setState({
            [arrayOfTeamNames[i]]: snap.val()

          })
          // console.log("snap-val", snap.val())
        })
      }
    })
  }

  render() {
   // console.log("STATE", this.state)
    return (
      <RoundsWon roundsWonByTeamsRed = {this.state.redTeamNumRoundsWon} roundsWonByTeamsBlue = {this.state.blueTeamNumRoundsWon}/>
    )
  }
}
