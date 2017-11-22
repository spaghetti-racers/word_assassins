import React, { Component } from 'react'
import firebase from 'APP/fire'

export default class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allWords: []
    }
    this.onClickNewGame = this.onClickNewGame.bind(this)
  }

  componentDidMount() {
    const allWords = firebase.database().ref('words/')
    allWords.on('value', snapshot => {
      const wordArray = snapshot.val()
      this.setState({allWords: wordArray})
    })
  }

  // CREATES A NEW GAME INSTANCE AND HAS ACCESS TO THE KEY
  onClickNewGame(event, data) {
    event.preventDefault()
    const newGameInstance = {
      currentGameStatus: {roundActive: false}
    }
    const newGameRef = firebase.database().ref('/gameInstances').push(newGameInstance)
    const newGameKey = newGameRef.key
    firebase.database().ref(`/gameInstances/${newGameKey}`).update({gameId: newGameKey})
  }

  render() {
    return (
      <div>
       <button onClick={this.onClickNewGame}>Trial Button</button>
      </div>
    )
  }
}
