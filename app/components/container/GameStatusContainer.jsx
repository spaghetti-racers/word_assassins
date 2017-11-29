import React, { Component } from 'react'
import firebase from 'APP/fire'

import GameStatus from '../presentational/GameStatus.jsx'

export default class GameStatusContainer extends Component {

  constructor() {
    super()
  }

  componentDidMount() {

  }

  render() {
    //console.log("currentGameStatus: ", this.props.currentGameStatus)
    //console.log("player0: ", this.props.players.player0)
    console.log("playerInfo: ", this.props.players.player0.role)
    console.log("playerName: ", this.props.players.player0.name)
    return (
      <GameStatus
      player0Role={this.props.players.player0.role}
      player1Role={this.props.players.player1.role}
      player2Role={this.props.players.player2.role}
      player3Role={this.props.players.player3.role}
      player0Name={this.props.players.player0.name}
      player1Name={this.props.players.player1.name}
      player2Name={this.props.players.player2.name}
      player3Name={this.props.players.player3.name}

       />
    )
  }

}
