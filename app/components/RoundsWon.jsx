import React, { Component } from 'react'
import firebase from 'APP/fire'

export default class RoundsWon extends Component {
  constructor() {
    super()
    this.state = {
      yellow: 0,
      purple: 0
    }
  }

  componentDidMount() {
    const rootRef = firebase.database().ref()
    const colors = rootRef.child('colors')
    //const yellow = colors.child('yellow')
    //const purple = colors.child('purple')
    console.log("colors", colors)

    colors.on('value', snap => {
      console.log("OH SNAPPPP: ", snap.val())
      const keyArr = Object.keys(snap.val())

      console.log("keyArr", keyArr)
      for(let i = 0; i < keyArr.length; i++) {
        colors.child(keyArr[i]).on('value', snap => {
          this.setState({
            [keyArr[i]]: snap.val()
          })
        })
      }
    })

    // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

    // function resetCard()

    // updateCard()
    // [{
    //   index: 0,
    //   color: red,
    //   clicked: true,
    //   word: 'bat'
    // }]

    // yellow.on('value', snap => {
    //   this.setState({
    //     yellow: snap.val()
    //   })
    // })

    // purple.on('value', snap => {
    //   this.setState({
    //     purple: snap.val()
    //   })
    // })

    // colors.on('value', snap => {
    //   this.setState({
    //     yellow: snap.val()
    //   })
    // })
  }

  render() {
    //console.log('PROPS: ', this.props)
    return (
      <div>
        <h2>Rounds Won: </h2>
        <h6>Yellow: {this.state.yellow}</h6>
        <h6>Purple: {this.state.purple}</h6>
      </div>
    )
  }
}
