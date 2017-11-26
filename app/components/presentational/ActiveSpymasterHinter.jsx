import React from 'react'

const ActiveSpymasterHinter = props =>
(
  <div>
    <h1>Display Spymaster hint </h1>
  <div className="ui input">
      <input value={props.numberOfWordsToGuess} onChange={props.handleNumberChange} type="number" placeholder="enter a number" required disabled={props.hintApproval? 'disabled': null}/>
      <input value={props.possibleHint} onChange={props.handlePossibleHint} type="text" placeholder="enter a hint" disabled={props.hintApproval? 'disabled': null} />
      <button
        disabled={props.possibleHint.length<=2 || props.numberOfWordsToGuess<1}
        onClick = {props.submitPotentialHint}
        className="ui button"
      >
      Confirm hint
      </button>
      <button onClick = {props.resetHintGenerator} disabled={!props.hintApproval? 'disabled' : null}>Submit Hint</button>
    </div>
  </div>
)

export default ActiveSpymasterHinter
