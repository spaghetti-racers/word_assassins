import React from 'react'

const CardsRemaining = props => {

  return (
    <div>
      <h3># Cards Remaining</h3>
      <h5>Red Team: {props.numCardsLeftRed}</h5>
      <h5>Blue Team: {props.numCardsLeftBlue}</h5>
    </div>
  )
}

export default CardsRemaining
