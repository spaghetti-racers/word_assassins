import React from 'react'

const CardsRemaining = props => {

  return (
    <div>
      <h4># Cards Remaining</h4>
      <h6>Red Team: {props.numCardsLeftRed}</h6>
      <h6>Blue Team: {props.numCardsLeftBlue}</h6>
    </div>
  )

}

export default CardsRemaining
