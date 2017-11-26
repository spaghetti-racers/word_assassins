import React, { Component } from 'react'
import firebase from 'APP/fire'
import Board from '../presentational/Board'
import { Button } from 'semantic-ui-react'
import { generateSelectedWordsGC, shuffleArrayGC, generateColorsGC, generateCardsGC } from '../../gameLogic'

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
    //console.log("props:  ", this.props)
    //console.log("game status: ", this.props.currentGameStatus)
    let updatedCardsRemaining = {}
    const clickedCardIndex = data.children.props.value
    const clickedCard = firebase.database().ref(`gameInstances/${this.props.gameId}/gameCards/${clickedCardIndex}`)
    clickedCard.update({ clicked: true })

    const dataRef = firebase.database().ref()
    const cardsRemaining = dataRef.child('gameInstances').child(this.props.gameId).child('currentGameStatus').child('cardsRemaining')

    const roundsWon = dataRef.child('gameInstances').child(this.props.gameId).child('currentGameStatus')

    const gameStatus = dataRef.child('gameInstances').child(this.props.gameId).child('currentGameStatus')

    gameStatus.on('value', snap => {
      //console.log("DUUUUUUUDE!!!!!: ", snap.val())
      let currPhaseOfGame = {}
      const currentGameStatus = snap.val()
      const blueCardsLeft = currentGameStatus.cardsRemaining.blueTeamNumCardsLeft
      const redCardsLeft = currentGameStatus.cardsRemaining.redTeamNumCardsLeft
      console.log("blueCardslet: ", blueCardsLeft)
      console.log("redCardsLeft: ", redCardsLeft)
      if (blueCardsLeft === 0) {
        currPhaseOfGame = {
          RoundsWonByTeams: {
            blueTeamNumRoundsWon: this.props.currentGameStatus.RoundsWonByTeams.blueTeamNumRoundsWon + 1,
            redTeamNumRoundsWon: this.props.currentGameStatus.RoundsWonByTeams.redTeamNumRoundsWon
          }
        }
      } else if (redCardsLeft === 0) {
        currPhaseOfGame = {
          RoundsWonByTeams: {
            blueTeamNumRoundsWon: this.props.currentGameStatus.RoundsWonByTeams.blueTeamNumRoundsWon,
            redTeamNumRoundsWon: this.props.currentGameStatus.RoundsWonByTeams.redTeamNumRoundsWon + 1
          }
        }
      }
      roundsWon.update(currPhaseOfGame)
    })

    // let currPhaseOfGame = {}
    // if (this.props.currentGameStatus.cardsRemaining.redTeamNumCardsLeft === 0) {
    //   currPhaseOfGame = {
    //     RoundsWonByTeams: {
    //       blueTeamNumRoundsWon: this.props.currentGameStatus.RoundsWonByTeams.blueTeamNumRoundsWon,
    //       redTeamNumRoundsWon: this.props.currentGameStatus.RoundsWonByTeams.redTeamNumRoundsWon + 1
    //     }
    //   }
    //  console.log("new object for red", currPhaseOfGame)
    //   roundsWon.update(currPhaseOfGame)
    // }
    // else if (this.props.currentGameStatus.cardsRemaining.blueTeamNumCardsLeft === 0) {
    //   currPhaseOfGame = {
    //     RoundsWonByTeams: {
    //       blueTeamNumRoundsWon: this.props.currentGameStatus.RoundsWonByTeams.blueTeamNumRoundsWon + 1,
    //       redTeamNumRoundsWon: this.props.currentGameStatus.RoundsWonByTeams.redTeamNumRoundsWon
    //     }
    //   }
    //   console.log("new object for blue", currPhaseOfGame)
    //   roundsWon.update(currPhaseOfGame)
    // }

    //GAME LOGIC FUNCTION -- updates CardsRemaining based on a card click
    if (this.state.cards[clickedCardIndex].color === 'blue') {
      //console.log("rblue emaining: ", this.props.currentGameStatus.cardsRemaining.blueTeamNumCardsLeft)
      updatedCardsRemaining = {
        blueTeamNumCardsLeft: this.props.currentGameStatus.cardsRemaining.blueTeamNumCardsLeft - 1, redTeamNumCardsLeft: this.props.currentGameStatus.cardsRemaining.redTeamNumCardsLeft
      }
      cardsRemaining.update(updatedCardsRemaining)
    }
    else if (this.state.cards[clickedCardIndex].color === 'red') {
      //console.log("rblue emaining: ", this.props.currentGameStatus.cardsRemaining.blueTeamNumCardsLeft)
      updatedCardsRemaining = {
        blueTeamNumCardsLeft: this.props.currentGameStatus.cardsRemaining.blueTeamNumCardsLeft, redTeamNumCardsLeft: this.props.currentGameStatus.cardsRemaining.redTeamNumCardsLeft - 1
      }
      cardsRemaining.update(updatedCardsRemaining)
    }
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
            /> :
            <Button onClick={this.getCardsOnClick}>this is a Button</Button>
        }
      </div>
    )
  }
}
