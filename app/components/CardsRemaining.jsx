import React, {Component} from 'react'
import firebase from 'APP/fire'
import { Grid } from 'semantic-ui-react'

export default class CardsRemaining extends Component {
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

  // setNumCards(cardsObject) {
  //   const dataRef = firebase.database().ref()
  //   const numCardsLeft = dataRef.child('numCardsLeft')
  //   numCardsLeft.set({
  //     redTeamNumCardsLeft: cardsObject.red,
  //     blueTeamNumCardsLeft: cardsObject.blue
  //   })
  // }

  render() {
    console.log('our props ', this.props.numCardsLeft)
    return (

      <Grid>
        <Grid.Row>
          <Grid.Column>
             <h4>Cards Left</h4>
          </Grid.Column>

        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={6}>
             <h6>Red Team: {this.props.numCardsLeft.red}</h6>
          </Grid.Column>

          <Grid.Column width={6}>
            <h6>Blue Team: {this.props.numCardsLeft.blue}</h6>
          </Grid.Column>

        </Grid.Row>

      </Grid>
    )
  }
}
