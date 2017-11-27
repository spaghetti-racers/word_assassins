import React, { Component } from 'react'
import firebase from 'APP/fire'
import Board from '../presentational/Board'
import { Button } from 'semantic-ui-react'
import { generateSelectedWordsGC, shuffleArrayGC, generateColorsGC, generateCardsGC, updateRoundsWon, updateCardsRemaining, updateGuessesAllowed } from '../../gameLogic'

export default class BoardContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: []
    }
    this.pickCard = this.pickCard.bind(this)
    this.getCardsOnClick = this.getCardsOnClick.bind(this)
  }

  componentDidMount() {
    const selectedWords = generateSelectedWordsGC(this.props.allWords)
    const shuffledColorArray = generateColorsGC(this.props.currentGameStatus.whoGoesFirst, shuffleArrayGC)
    generateCardsGC(selectedWords, shuffledColorArray, this.props.currentGameStatus.whoGoesFirst, this.props.gameId)
  }

  // ONCLICK LISTENER TO UPDATE THE STATUS OF A CARD IN THE DB WHEN CLICKED
  pickCard(event, data) {
    event.preventDefault()

    let cardsRemainingObj = {}
    let updatedNumGuessesAllowedObj = {}
    const clickedCardIndex = data.children.props.value
    const clickedCard = firebase.database().ref(`gameInstances/${this.props.gameId}/gameCards/${clickedCardIndex}`)
    clickedCard.update({ clicked: true })

    const dataRef = firebase.database().ref()
    const cardsRemaining = dataRef.child('gameInstances').child(this.props.gameId).child('currentGameStatus').child('cardsRemaining')

    const roundsWon = dataRef.child('gameInstances').child(this.props.gameId).child('currentGameStatus')

    const gameStatus = dataRef.child('gameInstances').child(this.props.gameId).child('currentGameStatus')

    const numGuessesAllowedLocation = gameStatus.child('displayHint')

    //GAME LOGIC FUNCTION - update RoundsWon based on card click/cards remaining === 0
    gameStatus.on('value', snap => {

      let currPhaseOfGame = {}

      const currentGameStatus = snap.val()
      const blueCardsLeft = currentGameStatus.cardsRemaining.blueTeamNumCardsLeft
      const redCardsLeft = currentGameStatus.cardsRemaining.redTeamNumCardsLeft

      currPhaseOfGame = updateRoundsWon(blueCardsLeft, redCardsLeft, this.props.currentGameStatus.RoundsWonByTeams.blueTeamNumRoundsWon, this.props.currentGameStatus.RoundsWonByTeams.redTeamNumRoundsWon)

      roundsWon.update(currPhaseOfGame)

    })

    //GAME LOGIC FUNCTION -- updates CardsRemaining based on a card click
    cardsRemainingObj = updateCardsRemaining(this.state.cards[clickedCardIndex].color, this.props.currentGameStatus.cardsRemaining.blueTeamNumCardsLeft, this.props.currentGameStatus.cardsRemaining.redTeamNumCardsLeft, this.props.currentGameStatus.activeTeam)
    cardsRemaining.update(cardsRemainingObj)

    updatedNumGuessesAllowedObj = updateGuessesAllowed(this.state.cards[clickedCardIndex].color, this.props.currentGameStatus.displayHint,this.props.currentGameStatus.activeTeam)

    numGuessesAllowedLocation.update(updatedNumGuessesAllowedObj)

  }

  // ONCLICK LISTENER SET ROUND ACTIVE TO TRUE AND THEN GET ALL THE CARDS TO PASS AS PROPS TO RENDER IN BOARD
  getCardsOnClick() {
    const allCards = firebase.database().ref(`gameInstances/${this.props.gameId}`)
    allCards.on('value', snapshot => {
      const cardArray = snapshot.val()
      this.setState({ cards: cardArray.gameCards })
      firebase.database().ref(`gameInstances/${this.props.gameId}/currentGameStatus`).update({ roundActive: true })
    })
  }

  render() {
    return (
      <div>
        {
          this.props.currentGameStatus.roundActive ?
            <Board
              gameId={this.props.gameId}
              currentGameStatus={this.props.currentGameStatus}
              pickCard={this.pickCard}
              cards={this.state.cards}
              players={this.props.players}
            /> :
            <Button onClick={this.getCardsOnClick}>this is a Button</Button>
        }
      </div>
    )
  }
}
