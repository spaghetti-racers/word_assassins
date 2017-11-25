import React, { Component } from 'react'
import firebase from 'APP/fire'
import BoardContainer from './container/BoardContainer'

export default class GameView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allWords: []
    }
  }

  componentDidMount() {
    const allWords = firebase.database().ref('words/')
    allWords.on('value', snapshot => {
      const wordArray = snapshot.val()
      this.setState({allWords: wordArray})
    })
  }

  render() {
    return (
      <div>
        {this.state.allWords.length && <BoardContainer allWords={this.state.allWords} whoGoesFirst={'blueTeam'} gameId={this.props.params.gameId} />}
      </div>
    )
  }
}
