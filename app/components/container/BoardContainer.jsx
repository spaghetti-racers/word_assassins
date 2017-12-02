import React, { Component } from 'react'
import firebase from 'APP/fire'
import Board from '../presentational/Board'
import { Button } from 'semantic-ui-react'
import { generateSelectedWordsGC, shuffleArrayGC, generateColorsGC, generateCardsGC, updateRoundsWon, updateCardsRemaining, updateGuessesAllowed, endTurn, updateNextRoundStatus, checkActiveTeam } from '../../gameLogic'

export default class BoardContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      activeTeam: '',
      numOfWordGuesses: 0,
      role: '',
      teamColor: '',
      cardsRemaining: {}
    }
    this.pickCard = this.pickCard.bind(this)
    this.startNewRoundOnClick = this.startNewRoundOnClick.bind(this)
    this.passButtonClick = this.passButtonClick.bind(this)
  }

  componentDidMount() {
    const dataRef = firebase.database().ref()
    const gameStatus = dataRef.child('gameInstances').child(this.props.gameId).child('currentGameStatus')

    gameStatus.on('value', snap => {
      const currPhaseOfGame = {}

      const currentGameStatus = snap.val()

      this.setState({ activeTeam: currentGameStatus.activeTeam })
      this.setState({ numOfWordGuesses: currentGameStatus.displayHint.numOfWordGuesses })
      this.setState({ cardsRemaining: currentGameStatus.cardsRemaining })
    })

    const getCardsForState = firebase.database().ref(`gameInstances/${this.props.gameId}/gameCards`)
    getCardsForState.on('value', snapshot => {
      this.setState({ cards: snapshot.val() })
    })

    let userId = this.props.userId
    let obj = this.props.players
    let arr = Object.keys(this.props.players)
    let role = ''
    let teamColor = ''
    arr.forEach(elem => {
      if (obj[elem].playerId === userId) {
        role = obj[elem].role
        teamColor = obj[elem].teamColor
      }
    })
    this.setState({ role: role, teamColor: teamColor })
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
    const roundActive = dataRef.child('gameInstances').child(this.props.gameId).child('currentGameStatus')

    const currentNumGuesses = dataRef.child('gameInstances').child(this.props.gameId).child('currentGameStatus').child('displayHint').child('numOfWordGuesses')

    const numGuessesAllowedLocation = gameStatus.child('displayHint')

    // GAME LOGIC FUNCTION - Update active team at end of turn, numOfWordGuesses === 0
    currentNumGuesses.on('value', snap => {
      const currentActiveTeam = this.state.activeTeam
      const guessesRemaining = snap.val()
      const newTeam = endTurn(guessesRemaining, currentActiveTeam)

      gameStatus.update({ activeTeam: newTeam })
    })

    // GAME LOGIC FUNCTION - update RoundsWon based on card click/cards remaining === 0
    gameStatus.on('value', snap => {
      let currPhaseOfGame = {}

      const currentGameStatus = snap.val()
      const blueCardsLeft = currentGameStatus.cardsRemaining.blueTeamNumCardsLeft
      const redCardsLeft = currentGameStatus.cardsRemaining.redTeamNumCardsLeft

      const readyForNextRound = updateNextRoundStatus(blueCardsLeft, redCardsLeft)

      currPhaseOfGame = updateRoundsWon(blueCardsLeft, redCardsLeft, this.props.currentGameStatus.RoundsWonByTeams.blueTeamNumRoundsWon, this.props.currentGameStatus.RoundsWonByTeams.redTeamNumRoundsWon)

      roundsWon.update(currPhaseOfGame)

      if (readyForNextRound) {
        gameStatus.update(
          { roundActive: false }
        )
        gameStatus.update(
          { cardsRemaining: { blueTeamNumCardsLeft: 9, redTeamNumCardsLeft: 8 } }
        )
      }
    })

    // GAME LOGIC FUNCTION -- updates CardsRemaining based on a card click
    cardsRemainingObj = updateCardsRemaining(this.state.cards[clickedCardIndex].color, this.props.currentGameStatus.cardsRemaining.blueTeamNumCardsLeft, this.props.currentGameStatus.cardsRemaining.redTeamNumCardsLeft, this.props.currentGameStatus.activeTeam)
    cardsRemaining.update(cardsRemainingObj)

    updatedNumGuessesAllowedObj = updateGuessesAllowed(this.state.cards[clickedCardIndex].color, this.props.currentGameStatus.displayHint, this.props.currentGameStatus.activeTeam)

    numGuessesAllowedLocation.update(updatedNumGuessesAllowedObj)
  }

  // ONCLICK LISTENER SET ROUND ACTIVE TO TRUE AND THEN GET ALL THE CARDS TO PASS AS PROPS TO RENDER IN BOARD
  startNewRoundOnClick() {
    const allCards = firebase.database().ref(`gameInstances/${this.props.gameId}`)
    firebase.database().ref(`gameInstances/${this.props.gameId}/currentGameStatus`).update({ roundActive: true })
    const selectedWords = generateSelectedWordsGC(this.props.allWords)
    const shuffledColorArray = generateColorsGC(this.props.currentGameStatus.whoGoesFirst, shuffleArrayGC)
    generateCardsGC(selectedWords, shuffledColorArray, this.props.currentGameStatus.whoGoesFirst, this.props.gameId)
    console.log('cards on state ', this.state.cards)
  }

  passButtonClick() {
    let newActiveTeam = checkActiveTeam(this.props.currentGameStatus.activeTeam)

    firebase.database().ref(`/gameInstances/${this.props.gameId}/currentGameStatus/displayHint`).update({ numOfWordGuesses: 0 })

    firebase.database().ref(`/gameInstances/${this.props.gameId}/currentGameStatus/`).update({ activeTeam: newActiveTeam })
  }

  render() {
    console.log('the props for cards remaining', this.props.currentGameStatus.cardsRemaining.blueTeamNumCardsLeft)
    return (
      <div >
        {
          this.props.currentGameStatus.roundActive ?
            <Board
              gameId={this.props.gameId}
              currentGameStatus={this.props.currentGameStatus}
              pickCard={this.pickCard}
              cards={this.state.cards}
              players={this.props.players}
              passButtonClick={this.passButtonClick}
              userId={this.props.userId}
              role={this.state.role}
              teamColor={this.state.teamColor}
            /> :
            <Button onClick={this.startNewRoundOnClick}>Start Round</Button>
        }
      </div >
    )
  }
}
