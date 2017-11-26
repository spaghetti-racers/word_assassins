import firebase from 'APP/fire'

// When Cards Remaining for either team hits 0 then call RoundsWonIncrement Logic

// function roundsWonIncrement(currentWinningTeam, gameId) {
//   const dataRef = firebase.database().ref()
//   const gameInstance = dataRef.child('gameInstances').child(gameId).child('currentGameStatus').child('RoundsWonByTeams')

//   if (currentWinningTeam === 'redTeam') {

//   }
//   gameInstance.once('value').then

//   gameInstance.update({
//     blueTeamNumRoundsWon: 0,
//     redTeamNumRoundsWon:
//   })

// }

const getCurrentRoundsWonScore = function(gameId) {
  const dataRef = firebase.database().ref()
  const gameInstance = dataRef.child('gameInstances').child(gameId).child('currentGameStatus').child('RoundsWonByTeams')
  return gameInstance.once('value').then(function(snap) {
    const roundsWon = snap.val()
    const redTeamRoundsWon = roundsWon.redTeamNumRoundsWon
    const blueTeamRoundsWon = roundsWon.blueTeamNumRoundsWon
    return [redTeamRoundsWon, blueTeamRoundsWon]
  })
}

export default getCurrentRoundsWonScore
