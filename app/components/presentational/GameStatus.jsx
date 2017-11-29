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
        <Table.Row style={{backgroundColor: props.player0Color.slice(0, -4)}}>
          <Table.Cell style={{color: 'white'}}>{props.player0Name}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{props.player0Role}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>C</Table.Cell>
        </Table.Row>
        <Table.Row style={{backgroundColor: props.player1Color.slice(0, -4)}}>
          <Table.Cell style={{color: 'white'}}>{props.player1Name}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{props.player1Role}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>F</Table.Cell>
        </Table.Row>
        <Table.Row style={{backgroundColor: props.player2Color.slice(0, -4)}}>
          <Table.Cell style={{color: 'white'}}>{props.player2Name}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{props.player2Role}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>I</Table.Cell>
        </Table.Row>
        <Table.Row style={{backgroundColor: props.player3Color.slice(0, -4)}}>
          <Table.Cell style={{color: 'white'}}>{props.player3Name}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{props.player3Role}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>L</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
export default GameStatus
