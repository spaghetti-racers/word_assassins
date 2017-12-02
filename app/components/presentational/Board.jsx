import React from 'react'
import { Card, Button } from 'semantic-ui-react'

const Board = props => {

  //console.log("PROOOOOOOOOOPS:  ", props)
  //let playersArr = Object.keys(props.players)
  const player = props.userId

  return (

    <div>
      {
        props.role === 'spymaster' ?
          <div>
            <Card.Group itemsPerRow={5}>
              {
                props.cards && props.cards.map((card, idx) =>
                  (
                    // LOGIC TO CHANGE COLOR AND WORD VIEW OF THE CARD UPON CLICK BASED ON COLOR/CLICKED ATTRIBUTES IN DB
                    <Card style={{ backgroundColor: card.color }} key={card.word}>
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
          : props.teamColor === props.currentGameStatus.activeTeam ?
            <div>
              <Card.Group itemsPerRow={5}>
                {
                  props.cards && props.cards.map((card, idx) =>
                    (
                      // LOGIC TO CHANGE COLOR AND WORD VIEW OF THE CARD UPON CLICK BASED ON COLOR/CLICKED ATTRIBUTES IN DB
                      <Card onClick={card.clicked ? null : props.pickCard} style={{ backgroundColor: card.clicked ? card.color : 'white' }} key={card.word}>
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
            :
            <div>
              <Card.Group itemsPerRow={5}>
                {
                  props.cards && props.cards.map((card, idx) =>
                    (
                      // LOGIC TO CHANGE COLOR AND WORD VIEW OF THE CARD UPON CLICK BASED ON COLOR/CLICKED ATTRIBUTES IN DB
                    <Card style={{ backgroundColor: card.clicked ? card.color : 'white' }} key={card.word}>
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
      }
      <div className="passButtonWrapper">
        <Button onClick={props.passButtonClick}> PASS TURN</Button>
      </div>
    </div>
  )
}

export default Board
