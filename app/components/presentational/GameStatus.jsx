import React from 'react'

import { Icon, Label, Menu, Table } from 'semantic-ui-react'

const GameStatus = props => {

  return (

    <Table className="gameStatusTable" celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Player Name</Table.HeaderCell>
          <Table.HeaderCell>Role</Table.HeaderCell>
          <Table.HeaderCell>Whose Turn?</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>{props.player0Name}</Table.Cell>
          <Table.Cell>{props.player0Role}</Table.Cell>
          <Table.Cell>C</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{props.player1Name}</Table.Cell>
          <Table.Cell>{props.player1Role}</Table.Cell>
          <Table.Cell>F</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{props.player2Name}</Table.Cell>
          <Table.Cell>{props.player2Role}</Table.Cell>
          <Table.Cell>I</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{props.player3Name}</Table.Cell>
          <Table.Cell>{props.player3Role}</Table.Cell>
          <Table.Cell>L</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
export default GameStatus
