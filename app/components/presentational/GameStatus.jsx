import React from 'react'

import { Icon, Label, Menu, Table } from 'semantic-ui-react'

const GameStatus = props => {

  return (

    <Table className="gameStatusTable" celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell style={{fontSize: '20'}}>Player Name</Table.HeaderCell>
          <Table.HeaderCell style={{fontSize: '20'}}>Role</Table.HeaderCell>
          <Table.HeaderCell style={{fontSize: '20'}}>Whose Turn?</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row style={{backgroundColor: props.player0Color.slice(0, -4)}}>
          <Table.Cell style={{color: 'white'}}>{props.player0Name}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{props.player0Role}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>It's your turn</Table.Cell>
        </Table.Row>
        <Table.Row style={{backgroundColor: props.player1Color.slice(0, -4)}}>
          <Table.Cell style={{color: 'white'}}>{props.player1Name}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{props.player1Role}</Table.Cell>
          <Table.Cell style={{color: 'white'}}></Table.Cell>
        </Table.Row>
        <Table.Row style={{backgroundColor: props.player2Color.slice(0, -4)}}>
          <Table.Cell style={{color: 'white'}}>{props.player2Name}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{props.player2Role}</Table.Cell>
          <Table.Cell style={{color: 'white'}}></Table.Cell>
        </Table.Row>
        <Table.Row style={{backgroundColor: props.player3Color.slice(0, -4)}}>
          <Table.Cell style={{color: 'white'}}>{props.player3Name}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{props.player3Role}</Table.Cell>
          <Table.Cell style={{color: 'white'}}></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
export default GameStatus
