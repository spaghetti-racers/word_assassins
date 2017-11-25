import React from 'react'
import { Card } from 'semantic-ui-react'

const Board = props =>
  (
    <div>
      <Card.Group itemsPerRow={5}>
        {
          props.cards && props.cards.map((card, idx) =>
            (
              // LOGIC TO CHANGE COLOR AND WORD VIEW OF THE CARD UPON CLICK BASED ON COLOR/CLICKED ATTRIBUTES IN DB
              <Card onClick={props.pickCard} style={{backgroundColor: card.clicked ? card.color : 'white'}} key={card.word}>
                <Card.Content value={idx}>
                  {
                    card.clicked ? ' ' : <Card.Header value={idx}> {card.word} </Card.Header>
                  }
                </Card.Content>
              </Card>)
          )
        }
      </Card.Group>
    </div>
  )

export default Board
