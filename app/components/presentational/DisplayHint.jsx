import React from 'react'
import { Grid } from 'semantic-ui-react'

const DisplayHint = props => {
  const styles = {
    color: 'white',
    backgroundColor: 'black',
    padding: 5
  }

  return (
    <div>
      <h3>Hint: <span style={styles}>{props.hintWord.toUpperCase()}</span></h3>
      <h5>Cards Associated with Hint: {props.hintNumGuessesAllowed - 1}</h5>
      <h5>Guesses Remaining: {props.hintNumGuessesAllowed}</h5>
    </div>
  )
}

export default DisplayHint
