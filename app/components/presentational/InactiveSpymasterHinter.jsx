import React from 'react'
import {Button} from 'semantic-ui-react'

const InactiveSpymasterHinter = props => {
  return (
    props.role==='spymaster'?
    <div>
      <h1>Approve Hint for Submission</h1>
      {
        !props.possibleHint?<h3>Waiting for Spymaster to Submit A Hint</h3>:
        <div>
          <h3>The word to use as a hint is {props.possibleHint} </h3>
          <h3>The number of words associated is {props.numberOfWordsToGuess - 1} </h3>
          <Button onClick={props.validateHint}>Validate</Button>
          <Button>Resubmit Hint</Button>
        </div>
      }
    </div>
    :null
  )
}

export default InactiveSpymasterHinter
