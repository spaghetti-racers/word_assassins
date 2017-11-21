import React, {Component} from 'react'

export default class CardsRemaining extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: true
    }
    //this.setNumCards = this.setNumCards.bind(this)
  }

  componentDidMount() {

  }



  render() {
    console.log('our props ', this.props.numCardsLeft)
    return (
      <div>
        <h2>display hint</h2>

      </div>
    )
  }
}
