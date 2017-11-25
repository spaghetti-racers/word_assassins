import React, { Component } from 'react'
import firebase from 'APP/fire'
import { Grid } from 'semantic-ui-react'

const RoundsWon = props => {
  return (
    <div>
      <h4>Rounds Won</h4>
      <h6>Red Team: {props.roundsWonByTeamsRed}</h6>
      <h6>Blue Team: {props.roundsWonByTeamsBlue}</h6>
    </div>
  )

}

export default RoundsWon
