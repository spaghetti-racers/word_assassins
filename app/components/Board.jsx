import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import firebase from 'APP/fire'

export default class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: []
    }
    this.pickCard = this.pickCard.bind(this)
  }


  componentDidMount() {
    const allCards = firebase.database().ref('gameCards/')
    allCards.on('value', snapshot => {
      const cardArray = snapshot.val()
      this.setState({cards: cardArray})
      console.log('CARD ARRAY!!!', cardArray)
    })
  }

  pickCard(event, data) {
    console.log('DATAAAAA', data.children.props.value)
    event.preventDefault()
    // need to figure out what event.target.value gives us
    const clickedCardIndex = data.children.props.value
    const clickedCard = firebase.database().ref(`gameCards/${clickedCardIndex}`)
    clickedCard.update({clicked: true})
  }

  render() {
    return (
      <div>
        <Card.Group itemsPerRow={5}>
          {
            this.state.cards && this.state.cards.map((card, idx) =>
             (<Card onClick={this.pickCard} key={card.word}>
                <Card.Content value={idx}>
                  <Card.Header value={idx}>
                    {card.word}
                  </Card.Header>
                  <Card.Description value={idx}>
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
