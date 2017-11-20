import React, {Component} from 'react'

export default class CardsRemaining extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: true
    }
    //this.setNumCards = this.setNumCards.bind(this)
  }

  componentDidMount() {
    // const dataRef = firebase.database().ref()
    // const numCardsLeft = dataRef.child('numCardsLeft')
    // numCardsLeft.on('value', (snap) => {
    //   const arrayOfTeamNames = Object.keys(snap.val())
    //   for (let i = 0; i < arrayOfTeamNames.length; i++) {
    //     numCardsLeft.child(arrayOfTeamNames[i]).on('value', (snap) => {
    //       this.setState({
    //         [arrayOfTeamNames[i]]: snap.val()
    //       })
    //     })
    //   }
    //})
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
        <h2>display hint</h2>

      </div>
    )
  }
}
