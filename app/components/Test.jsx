import React, {Component} from 'react'
import firebase from 'APP/fire'

const database = firebase.database()

export default class Test extends Component {
  render() {
    // const cardsLeft
    return (
      <div>
        <h1>Cards Left: </h1>
        <h3>Yellow: </h3>
        <h3>Purple: </h3>
      </div>
    )
  }
}
