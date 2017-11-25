import React from 'react'
import RoundsWon from '../container/RoundsWonContainer.jsx'
import DisplayHint from '../container/DisplayHintContainer.jsx'
import CardsRemaining from '../container/CardsRemainingContainer.jsx'

import { Grid } from 'semantic-ui-react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

const Scoreboard = props => {
    return (
      <Table celled>
        <Table.Header>
          <h2>Scoreboard</h2>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>

              <RoundsWon roundsWonByTeams={{ red: props.roundsWonRedTeam, blue: props.roundsWonBlueTeam }} />
            </Table.Cell>

            <Table.Cell>
              <DisplayHint hint={{ word: props.word, numGuessesAllowed: props.numGuessesAllowed }} />
            </Table.Cell>
            <Table.Cell>
              <CardsRemaining numCardsLeft={{ red: props.redTeamNumCards, blue: props.blueTeamNumCards }} />
            </Table.Cell>

          </Table.Row>

        </Table.Body>

      </Table>
    )
}

export default Scoreboard
