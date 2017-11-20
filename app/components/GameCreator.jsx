import React, { Component } from 'react'
import firebase from 'APP/fire'
import Board from './Board'

export default class GameCreator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allWords: [],
      selectedWords: []
    }
    this.generateSelectedWords = this.generateSelectedWords.bind(this)
    this.generateCards = this.generateCards.bind(this)
  }

  componentDidMount() {
    const allWords = firebase.database().ref('words/')
    allWords.on('value', snapshot => {
      const wordArray = snapshot.val()
      this.setState({allWords: wordArray})
      this.setState({selectedWords: this.generateSelectedWords(this.state.allWords)})
      console.log('WOORDDSS: ', this.state.selectedWords)
      this.generateCards(this.state.selectedWords)
    })
  }

  generateSelectedWords(allWords) {
    const selectedWords = []
    while (selectedWords.length < 25) {
      const randomIndex = Math.floor(Math.random() * (allWords.length))
      if (!selectedWords.includes(allWords[randomIndex])) {
        selectedWords.push(allWords[randomIndex])
      }
    }
    return selectedWords
  }

  generateCards(selectedWordsCreation) {
    const gameCards = firebase.database().ref('/gameCards')
    selectedWordsCreation.forEach((word, index) => {
      const card = {}
      card[index] = {
        word: word,
        clicked: false
      }
      gameCards.update(card)
      console.log('CREATED A CARD: ', card)
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
