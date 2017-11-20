import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import firebase from 'APP/fire'

export default class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // cards: [ {card0: {word: 'big'}}, {card1: {word: 'forest'}}, {card2: {word: 'ogre'}}, {card3: {word: 'stomach'}}, {card4: {word: 'tokyo'}}, {card5: {word: 'antler'}} ]
      cards: [],
      words: []
    }
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

  componentDidMount() {
    const words = firebase.database().ref('words/')
    words.on('value', snapshot => {
      //const wordsFromDB = snapshot.val()
      const wordArray = snapshot.val()
      console.log('!!!!!!!!!!!!! Is this an array?', wordArray)
      //const cardKeys = Object.keys(snapshot.val())
      // for (let i=0; i < cardKeys.length; i++) {
      //   cardArray.push(cardsFromDB[cardKeys[i]])
      // }
      // console.log('!!!!!!!!!!!!!! The pushed to final array', cardArray)
      // console.log('~~~~~~~~~~~~ The keys from the snapshot', cardKeys)
      // console.log('============ The snapshot from the firebase DB', snapshot.val())
      this.setState({words: wordArray})
      console.log('~~~~~~~~~ Whats in state?', this.state.words)
    })
  }

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
