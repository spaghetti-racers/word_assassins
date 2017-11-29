import React from 'react'
import { Grid } from 'semantic-ui-react'

const DisplayHint = props => {
  const styles = {
    color: 'white',
    backgroundColor: 'black',
    padding: 5,
    fontSize: 22
  }

  return (
    <div>
      <h3 style={{fontSize: '17'}}>Hint: <span style={styles}>{props.hintWord.toUpperCase()}</span></h3>
      <h5 style={{fontSize: '17'}}>Cards Associated with Hint: {props.hintNumGuessesAllowed - 1}</h5>
      <h5 style={{fontSize: '17'}}>Guesses Remaining: {props.hintNumGuessesAllowed}</h5>
    </div>
  )
}

export default DisplayHint
