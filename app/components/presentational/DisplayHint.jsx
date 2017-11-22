import React from 'react'
import { Grid } from 'semantic-ui-react'

const DisplayHint = props => {

  return (
    <div>
      <h4>Hint</h4>
      <h6>Word: {props.hintWord}</h6>
      <h6>Number of Guesses Allowed: {props.hintNumGuessesAllowed}</h6>
    </div>
  )

}

export default DisplayHint
