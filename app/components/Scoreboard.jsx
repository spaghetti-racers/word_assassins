import React, { Component } from 'react'
import firebase from 'APP/fire'
import CardsRemaining from './CardsRemaining'
import RoundsWon from './RoundsWon'
import DisplayHint from './DisplayHint'
import { Grid } from 'semantic-ui-react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
export default class Scoreboard extends Component {
  constructor() {
    super()
    this.state = {
      redTeamRoundsWon: 1,
      blueTeamRoundsWon: 1,

      redTeamNumCards: 8,
      blueTeamNumCards: 9,
      word: 'blank',
      numGuessesAllowed: 2

    }
    this.setNumCards = this.setNumCards.bind(this)
    this.setRoundsWon = this.setRoundsWon.bind(this)
    this.displayHint = this.displayHint.bind(this)
  }

  componentDidMount() {

    const hintFake = { word: 'cat', numGuessesAllowed: 5 }
    this.displayHint(hintFake)
    this.setState({ word: 'Carmen', numGuessesAllowed: 17 })

    const FakeRoundsWonByTeams = { red: 30, blue: 20 }
    this.setRoundsWon(FakeRoundsWonByTeams)
    this.setState({ redTeamRoundsWon: FakeRoundsWonByTeams.red, blueTeamRoundsWon: FakeRoundsWonByTeams.blue })

    const numCardsRemainingFake = { red: 40, blue: 10 }
    this.setNumCards(numCardsRemainingFake)
    this.setState({ redTeamNumCards: numCardsRemainingFake.red, blueTeamNumCards: numCardsRemainingFake.blue })

  }
  displayHint(hint) {
    console.log("HINTT", hint)
    const dataRef = firebase.database().ref()
    const hintToDisplay = dataRef.child('displayHint')
    hintToDisplay.set({
      word: hint.word,
      numTurns: hint.numGuessesAllowed
    })
  }
  setNumCards(cardsObject) {
    const dataRef = firebase.database().ref()
    const numCardsLeft = dataRef.child('numCardsLeft')
    numCardsLeft.set({
      redTeamNumCardsLeft: cardsObject.red,
      blueTeamNumCardsLeft: cardsObject.blue
    })
  }

  setRoundsWon(roundsWonObject) {
    console.log("!!!!!!!!!!mi gente")
    // this.setState({ redTeamNumCards: cardsObject.red, blueTeamNumCards: cardsObject.blue })
    const dataRef = firebase.database().ref()
    const roundsWon = dataRef.child('RoundsWonByTeams')
    roundsWon.set({
      redTeamNumRoundsWon: roundsWonObject.red,
      blueTeamNumRoundsWon: roundsWonObject.blue
    })
  }

  render() {
    return (
      <Table celled>
        <Table.Header>
          <h2>Scoreboard</h2>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>

              <RoundsWon roundsWonByTeams={{ red: this.state.redTeamRoundsWon, blue: this.state.blueTeamRoundsWon }} />
            </Table.Cell>

            <Table.Cell>
              <DisplayHint hint={{ word: this.state.word, numGuessesAllowed: this.state.numGuessesAllowed }} />
            </Table.Cell>
            <Table.Cell>
              <CardsRemaining numCardsLeft={{ red: this.state.redTeamNumCards, blue: this.state.blueTeamNumCards }} />
            </Table.Cell>

          </Table.Row>

        </Table.Body>

      </Table>

    )
  }
}

//  <Grid>

//         <Grid.Row>
//           <Grid.Column>
//             <h3>Scoreboard</h3>
//           </Grid.Column>
//         </Grid.Row>

//         <Grid.Row>
//           <Grid.Column width={4}>
//             <RoundsWon roundsWonByTeams = {{red: this.state.redTeamRoundsWon, blue: this.state.blueTeamRoundsWon}} />
//           </Grid.Column>
//           <Grid.Column width={4}>
//             <CardsRemaining numCardsLeft={{red: this.state.redTeamNumCards, blue: this.state.blueTeamNumCards}}/>
//           </Grid.Column>
//         </Grid.Row>

//         <Grid.Row>
//           <Grid.Column>
//             <DisplayHint hint = {{word: this.state.word, numGuessesAllowed: this.state.numGuessesAllowed}}/>
//           </Grid.Column>
//         </Grid.Row>

//       </Grid>
