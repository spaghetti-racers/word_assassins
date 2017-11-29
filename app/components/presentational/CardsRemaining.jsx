import React from 'react'

const CardsRemaining = props => {

  return (
    <div>
      <h3 style={{fontSize: '20'}}># Cards Remaining</h3>
      <h5 style={{fontSize: '20'}}>Red Team: {props.numCardsLeftRed}</h5>
      <h5 style={{fontSize: '20'}}>Blue Team: {props.numCardsLeftBlue}</h5>
    </div>
  )
}

export default CardsRemaining
