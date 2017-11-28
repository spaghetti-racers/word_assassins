
export const updateRoundsWon = function(blueCardsLeft, redCardsLeft, blueRoundsWon, redRoundsWon) {
  let currPhaseOfGame = {}
  if (blueCardsLeft === 0) {
    currPhaseOfGame = {
      RoundsWonByTeams: {
        blueTeamNumRoundsWon: blueRoundsWon + 1,
        redTeamNumRoundsWon: redRoundsWon
      }
    }
  } else if (redCardsLeft === 0) {
    currPhaseOfGame = {
      RoundsWonByTeams: {
        blueTeamNumRoundsWon: blueRoundsWon,
        redTeamNumRoundsWon: redRoundsWon + 1
      }
    }
  }
  return currPhaseOfGame
}

export const endTurn = function(numOfWordGuesses, activeTeam) {
  let newTeam = activeTeam
  if (numOfWordGuesses === 0) {
    if (activeTeam === 'redTeam') {
      newTeam = 'blueTeam'
    } else {
      newTeam = 'redTeam'
    }
  }
  return newTeam
}
