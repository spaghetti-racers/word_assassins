import React from 'react'
import RoundsWon from '../container/RoundsWonContainer.jsx'
import DisplayHintContainer from '../container/DisplayHintContainer.jsx'
import CardsRemaining from '../container/CardsRemainingContainer.jsx'

import { Icon, Label, Menu, Table, Grid } from 'semantic-ui-react'

const Scoreboard = props => {
  return (
    <Table celled>
      <Table.Header>
        {/* //the below code is commented out for Friends and family night and should be added back after event is over. */}
        {/* <h2>Scoreboard</h2> */}
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>

            <RoundsWon roundsWonByTeams={{ red: props.roundsWonRedTeam, blue: props.roundsWonBlueTeam }} gameId={props.gameId} />
          </Table.Cell>

          <Table.Cell>
            <DisplayHintContainer hint={{ word: props.word, numGuessesAllowed: props.numGuessesAllowed }} gameId = {props.gameId}/>
          </Table.Cell>
          <Table.Cell>
            <CardsRemaining numCardsLeft={{ red: props.redTeamNumCards, blue: props.blueTeamNumCards }} gameId={props.gameId} currentGameStatus={props.currentGameStatus}/>
          </Table.Cell>

        </Table.Row>

      </Table.Body>

    </Table>
  )
}

export default Scoreboard
