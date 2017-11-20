import React, { Component } from 'react'
import firebase from 'APP/fire'
import Board from './Board'

export default class GameCreator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      whoGoesFirst: 'blueTeam',
      allWords: [],
      selectedWords: []
    }
    this.generateSelectedWords = this.generateSelectedWords.bind(this)
    this.generateCards = this.generateCards.bind(this)
    this.generateColors = this.generateColors.bind(this)
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

  // THIS FUNCTION RANDOMLY SELECTS 25 WORDS FROM ALL WORDS
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

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
  
  generateColors(whoGoesFirst) {
    let colors = []
    if (whoGoesFirst === 'redTeam') {
      colors = ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'black']
    } else {
      colors = ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'black']
    }
    return this.shuffleArray(colors)
  }

  // THIS FUNCTION MAKES 25 CARDS USING OUR RANDOM WORDS AND RANDOM COLORS, AND ADDS THEM TO THE DB
  generateCards(selectedWords) {
    const colors = this.generateColors(this.state.whoGoesFirst)
    const gameCards = firebase.database().ref('/gameCards')
    selectedWords.forEach((word, index) => {
      const card = {}
      card[index] = {
        word: word,
        clicked: false,
        color: colors[index]
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
