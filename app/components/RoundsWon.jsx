import React, { Component } from 'react'
import firebase from 'APP/fire'
import { Grid } from 'semantic-ui-react'
export default class RoundsWon extends Component {
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
    console.log('our props ', this.props.numCardsLeft)
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <h4>Rounds Won</h4>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <h6>Red Team: {this.props.roundsWonByTeams.red}</h6>
          </Grid.Column>
          <Grid.Column width={4}>
            <h6>Blue Team: {this.props.roundsWonByTeams.blue}</h6>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    )
  }
}
