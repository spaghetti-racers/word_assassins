import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import firebase from 'APP/fire'

export default class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: []
    }
  }


  componentDidMount() {
    const allCards = firebase.database().ref('gameCards/')
    allCards.on('value', snapshot => {
      const cardArray = snapshot.val()
      this.setState({cards: cardArray})
      console.log('CARD ARRAY!!!', cardArray)
    })
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
                  {/* <Card.Description>
                    {card.color}
                  </Card.Description> */}
                </Card.Content>
              </Card>)
            )
          }
        </Card.Group>
      </div>
    )
  }
}
