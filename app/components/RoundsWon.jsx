import React, {Component} from 'react'
import firebase from 'APP/fire'

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
      for (let i = 0; i <arrayOfTeamNames.length; i++) {
        roundsWon.child(arrayOfTeamNames[i]).on('value', (snap) => {
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
      <div>
        <h2>Rounds Won</h2>
        <h6>Red Team: {this.props.roundsWonByTeams.red}</h6>
        <h6>Blue Team: {this.props.roundsWonByTeams.blue}</h6>

      </div>
    )
  }
}
