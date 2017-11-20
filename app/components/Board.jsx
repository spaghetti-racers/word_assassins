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

  // pickCard() {
    
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
