import React, { Component } from 'react'
import firebase from 'APP/fire'
import Board from './Board'
import { generateSelectedWordsGC, shuffleArrayGC, generateColorsGC, generateCardsGC } from '../gameLogic'

export default class GameCreator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      whoGoesFirst: 'blueTeam',
      allWords: [],
      selectedWords: []
    }
  }

  componentDidMount() {
    const allWords = firebase.database().ref('words/')
    allWords.on('value', snapshot => {
      const wordArray = snapshot.val()
      this.setState({allWords: wordArray})
      this.setState({selectedWords: generateSelectedWordsGC(this.state.allWords)})
      const shuffledColorArray = generateColorsGC(this.state.whoGoesFirst, shuffleArrayGC)
      generateCardsGC(this.state.selectedWords, shuffledColorArray, this.state.whoGoesFirst)
    })
  }

  render() {
    return (
      <div>
       <Board />
      </div>
    )
  }
}
