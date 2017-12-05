
export const updateRoundsWon = function(blueCardsLeft, redCardsLeft, blueRoundsWon, redRoundsWon) {
  let currPhaseOfGame = {}
  if (blueCardsLeft === 0) {
    currPhaseOfGame = {
      RoundsWonByTeams: {
        blueTeamNumRoundsWon: blueRoundsWon + 1,
        redTeamNumRoundsWon: redRoundsWon
      },
      roundWinner: 'blueTeam'
    }
  } else if (redCardsLeft === 0) {
    currPhaseOfGame = {
      RoundsWonByTeams: {
        blueTeamNumRoundsWon: blueRoundsWon,
        redTeamNumRoundsWon: redRoundsWon + 1
      },
      roundWinner: 'redTeam'
    }
  }
  return currPhaseOfGame
}

export const endTurn = function(numOfWordGuesses, activeTeam) {
  let newTeam = activeTeam
  let role = 'activeGuesser'
  if (numOfWordGuesses === 0) {
    if (activeTeam === 'redTeam') {
      newTeam = 'blueTeam'
      role = 'activeSpymaster'
    } else {
      newTeam = 'redTeam'
      role = 'activeSpymaster'
    }
  }
  return [newTeam, role]
}
