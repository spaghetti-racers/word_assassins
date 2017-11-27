import React, { Component } from 'react'
import firebase from 'APP/fire'
import { browserHistory } from 'react-router'

export default class RoomsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // this.onClickNewGame = this.onClickNewGame.bind(this)
  }

  // onClickNewGame(event, data) {
  //   event.preventDefault()
  //   const newGameInstance = {
  //     currentGameStatus: {roundActive: false, whoGoesFirst: 'blueTeam'}
  //   }
  //   const newGameRef = firebase.database().ref('/gameInstances').push(newGameInstance)
  //   const newGameKey = newGameRef.key
  //   newGameRef.then(() => browserHistory.push(`/game-view/${newGameKey}/wordassassins`))
  // }

  render() {
    return (
      <div>
        You have entered a ROOM!!!
        {/* {
          <Rooms onClickNewGame={this.startGameOnClick}/>
        } */}
      </div>
    )
  }
}
