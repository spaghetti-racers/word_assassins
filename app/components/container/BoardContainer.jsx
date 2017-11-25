import React, { Component } from 'react'
import firebase from 'APP/fire'
import Board from '../presentational/Board'
import { generateSelectedWordsGC, shuffleArrayGC, generateColorsGC, generateCardsGC } from '../../gameLogic'

export default class BoardContainer extends Component {

  componentDidMount() {
    console.log('these are our props ', this.props)
    const selectedWords = generateSelectedWordsGC(this.props.allWords)
    const shuffledColorArray = generateColorsGC(this.props.currentGameStatus.whoGoesFirst, shuffleArrayGC)
    generateCardsGC(selectedWords, shuffledColorArray, this.props.currentGameStatus.whoGoesFirst, this.props.gameId)
  }

  render() {
    console.log('we are rendering. our props are ', this.props)
    return (
      <div>
        {
          this.props.currentGameStatus.roundActive ? <Board gameId={this.props.gameId} currentGameStatus={this.props.currentGameStatus}/>
          : <button>this is a button</button>
        }
      </div>
    )
  }
}
