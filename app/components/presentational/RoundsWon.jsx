import React, { Component } from 'react'
import firebase from 'APP/fire'
import { Grid } from 'semantic-ui-react'

const RoundsWon = props => {
  return (
    <div>
      <h3>Rounds Won</h3>
      <h5>Red Team: {props.roundsWonByTeamsRed}</h5>
      <h5>Blue Team: {props.roundsWonByTeamsBlue}</h5>
    </div>
  )
}

export default RoundsWon
