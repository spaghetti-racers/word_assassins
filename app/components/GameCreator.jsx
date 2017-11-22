import React, { Component } from 'react'
import firebase from 'APP/fire'
import Board from './Board'
import { generateSelectedWordsGC, shuffleArrayGC, generateColorsGC, generateCardsGC } from '../gameLogic'

export default class GameCreator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedWords: []
    }
  }

  componentDidMount() {
    const selectedWords = generateSelectedWordsGC(this.props.allWords)
    const shuffledColorArray = generateColorsGC(this.props.whoGoesFirst, shuffleArrayGC)
    generateCardsGC(selectedWords, shuffledColorArray, this.props.whoGoesFirst, this.props.gameId)
  }

  render() {
    return (
      <div>
       <Board gameId={this.props.gameId} />
      </div>
    )
  }
}
