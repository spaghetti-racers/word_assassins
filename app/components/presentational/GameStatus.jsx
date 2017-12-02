import React from 'react'

import { Icon, Label, Menu, Table } from 'semantic-ui-react'

const GameStatus = props => {
  const player0 = (props.player0Role === 'spymaster') ? (props.player0Color === props.currentGameStatus.activeTeam ? 'activeSpymaster' : 'confirmingSpymaster') : 'guesser'
  const player1 = (props.player1Role === 'spymaster') ? (props.player1Color === props.currentGameStatus.activeTeam ? 'activeSpymaster' : 'confirmingSpymaster') : 'guesser'
  const player2 = (props.player2Role === 'spymaster') ? (props.player2Color === props.currentGameStatus.activeTeam ? 'activeSpymaster' : 'confirmingSpymaster') : 'guesser'
  const player3 = (props.player3Role === 'spymaster') ? (props.player3Color === props.currentGameStatus.activeTeam ? 'activeSpymaster' : 'confirmingSpymaster') : 'guesser'
  //console.log('!!!!!!!!!!!!!!', player0, '\nplayer0Role :', props.player0Role, '\nplayer0Color :', props.player0Color, '\ncurrentTeam :', props.currentGameStatus.activeTeam)
  //(props.player0Role === 'spymaster' && props.currenGameStatus.activeRole !== 'guesser') ? (props.player0Color === props.currentGameStatus.activeTeam ? '')

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
          <Table.Cell style={{color: 'white'}}>{(player0 === props.currentGameStatus.activeRole && props.player0Color === props.currentGameStatus.activeTeam) ? 'It\'s your turn' : ''}</Table.Cell>
        </Table.Row>
        <Table.Row style={{backgroundColor: props.player1Color.slice(0, -4)}}>
          <Table.Cell style={{color: 'white'}}>{props.player1Name}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{props.player1Role}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{(player1 === props.currentGameStatus.activeRole && props.player1Color === props.currentGameStatus.activeTeam) ? 'It\'s your turn' : ''}</Table.Cell>
        </Table.Row>
        <Table.Row style={{backgroundColor: props.player2Color.slice(0, -4)}}>
          <Table.Cell style={{color: 'white'}}>{props.player2Name}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{props.player2Role}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{(player2 === props.currentGameStatus.activeRole && props.player2Color === props.currentGameStatus.activeTeam) ? 'It\'s your turn' : ''}</Table.Cell>
        </Table.Row>
        <Table.Row style={{backgroundColor: props.player3Color.slice(0, -4)}}>
          <Table.Cell style={{color: 'white'}}>{props.player3Name}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{props.player3Role}</Table.Cell>
          <Table.Cell style={{color: 'white'}}>{(player3 === props.currentGameStatus.activeRole && props.player3Color === props.currentGameStatus.activeTeam) ? 'It\'s your turn' : ''}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
export default GameStatus
