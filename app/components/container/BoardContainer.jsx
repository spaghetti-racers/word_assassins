import React, { Component } from 'react'
import firebase from 'APP/fire'
import Board from '../presentational/Board'
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
    const clickedCardIndex = data.children.props.value
    const clickedCard = firebase.database().ref(`gameInstances/${this.props.gameId}/gameCards/${clickedCardIndex}`)
    clickedCard.update({ clicked: true })
  }

  // ONCLICK LISTENER SET ROUND ACTIVE TO TRUE AND THEN GET ALL THE CARDS TO PASS AS PROPS TO RENDER IN BOARD
  getCardsOnClick() {
    const allCards = firebase.database().ref(`gameInstances/${this.props.gameId}`)
    allCards.on('value', snapshot => {
      const cardArray = snapshot.val()
      this.setState({ cards: cardArray.gameCards })
      firebase.database().ref(`gameInstances/${this.props.gameId}/currentGameStatus`).update({roundActive: true})
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
          <button onClick={this.getCardsOnClick}>this is a button</button>
        }
      </div>
    )
  }
}
