import React from 'react'

import { Icon, Label, Menu, Table } from 'semantic-ui-react'

const GameStatus = props => {
  const player0 = (props.player0Role === 'spymaster') ? (props.player0Color === props.currentGameStatus.activeTeam ? 'activeSpymaster' : 'confirmingSpymaster') : (props.player0Color === props.currentGameStatus.activeTeam ? 'activeGuesser' : 'passiveGuesser')

  const player1 = (props.player1Role === 'spymaster') ? (props.player1Color === props.currentGameStatus.activeTeam ? 'activeSpymaster' : 'confirmingSpymaster') : (props.player1Color === props.currentGameStatus.activeTeam ? 'activeGuesser' : 'passiveGuesser')

  const player2 = (props.player2Role === 'spymaster') ? (props.player2Color === props.currentGameStatus.activeTeam ? 'activeSpymaster' : 'confirmingSpymaster') : (props.player2Color === props.currentGameStatus.activeTeam ? 'activeGuesser' : 'passiveGuesser')

  const player3 = (props.player3Role === 'spymaster') ? (props.player3Color === props.currentGameStatus.activeTeam ? 'activeSpymaster' : 'confirmingSpymaster') : (props.player3Color === props.currentGameStatus.activeTeam ? 'activeGuesser' : 'passiveGuesser')

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
          <Table.Cell style={{color: 'white'}}>{(player0 === props.currentGameStatus.activeRole) ? 'It\'s your turn' : ''}</Table.Cell>
        </Table.Row>
        <Table.Row style={{backgroundColor: props.player1Color.slice(0, -4)}}>
          <Table.Cell style={{color: 'white'}}>{props.player1Name}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{props.player1Role}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{(player1 === props.currentGameStatus.activeRole) ? 'It\'s your turn' : ''}</Table.Cell>
        </Table.Row>
        <Table.Row style={{backgroundColor: props.player2Color.slice(0, -4)}}>
          <Table.Cell style={{color: 'white'}}>{props.player2Name}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{props.player2Role}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{(player2 === props.currentGameStatus.activeRole) ? 'It\'s your turn' : ''}</Table.Cell>
        </Table.Row>
        <Table.Row style={{backgroundColor: props.player3Color.slice(0, -4)}}>
          <Table.Cell style={{color: 'white'}}>{props.player3Name}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{props.player3Role}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{(player3 === props.currentGameStatus.activeRole) ? 'It\'s your turn' : ''}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
export default GameStatus
