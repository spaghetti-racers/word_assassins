import React from 'react'
import { Button } from 'semantic-ui-react'

const ActiveSpymasterHinter = props =>
(
  props.role === 'spymaster'?
  <div>
    <h1>Enter a hint for confirmation</h1>

  <div className="ui input">
      <input
        value={props.numberOfWordsToGuess}
        onChange={props.handleNumberChange}
        type="number" placeholder="enter a number"
        disabled={props.hintApproval? 'disabled': null}
      />

      <input
        value={props.possibleHint}
        onChange={props.handlePossibleHint}
        type="text" placeholder="enter a hint"
        disabled={props.hintApproval? 'disabled': null}
      />

      <Button
        disabled={props.possibleHint.length<=2 || props.numberOfWordsToGuess<1}
        onClick = {props.submitPotentialHint}
      >
        Confirm hint
      </Button>

      <Button
        disabled={!props.hintApproval? true : null}
        onClick = {props.resetHintGenerator}
      >
        Submit Hint
      </Button>
    </div>
  </div>
  : null
)

export default ActiveSpymasterHinter
