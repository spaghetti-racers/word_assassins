import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import firebase from 'APP/fire'

export default class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      allWords: [],
      selectedWords: []
    }
    this.generateSelectedWords = this.generateSelectedWords.bind(this)
  }


  componentDidMount() {
    const allWords = firebase.database().ref('words/')
    allWords.on('value', snapshot => {
      const wordArray = snapshot.val()
      this.setState({allWords: wordArray})
      this.setState({selectedWords: this.generateSelectedWords(this.state.allWords)})
      console.log('WOORDDSS: ', this.state.selectedWords)
    })
  }

  generateSelectedWords(allWords) {
    const selectedWords = []
    while (selectedWords.length < 25) {
      const randomIndex = Math.floor(Math.random() * (allWords.length))
      console.log(randomIndex)
      if (!selectedWords.includes(allWords[randomIndex])) {
        selectedWords.push(allWords[randomIndex])
      }
    }
    return selectedWords
  }

  // componentDidMount() {
  //   const cards = firebase.database().ref('cards/')
  //   cards.on('value', snapshot => {
  //     const cardsFromDB = snapshot.val()
  //     const cardArray = []
  //     const cardKeys = Object.keys(snapshot.val())
  //     for (let i=0; i < cardKeys.length; i++) {
  //       cardArray.push(cardsFromDB[cardKeys[i]])
  //     }
  //     console.log('!!!!!!!!!!!!!! The pushed to final array', cardArray)
  //     console.log('~~~~~~~~~~~~ The keys from the snapshot', cardKeys)
  //     console.log('============ The snapshot from the firebase DB', snapshot.val())
  //     this.setState({cards: cardArray})
  //   })
  // }

  render() {
    return (
      <div>
        <Card.Group itemsPerRow={5}>
          {
            this.state.cards && this.state.cards.map((card, idx) =>
             (<Card key={card.word}>
                <Card.Content>
                  <Card.Header>
                    {card.word}
                  </Card.Header>
                  <Card.Description>
                    {card.color}
                  </Card.Description>
                </Card.Content>
              </Card>)
            )
          }
        </Card.Group>
      </div>
    )
  }
}
