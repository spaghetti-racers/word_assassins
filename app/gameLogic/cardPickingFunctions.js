export const updateCardsRemaining = function (cardColor, blueRemainingCards, redRemainingCards, activeTeam) {
  let updatedCardsRemaining = {}
  if (cardColor === 'blue') {
    updatedCardsRemaining = {
      blueTeamNumCardsLeft: blueRemainingCards - 1, redTeamNumCardsLeft: redRemainingCards
    }
  } else if (cardColor === 'red') {
    updatedCardsRemaining = {
      blueTeamNumCardsLeft: blueRemainingCards, redTeamNumCardsLeft: redRemainingCards - 1
    }
  }
  else if (cardColor === 'black') {
    if (activeTeam === 'redTeam') {
      updatedCardsRemaining = {
        blueTeamNumCardsLeft: 0, redTeamNumCardsLeft: redRemainingCards
      }
    } else {
      updatedCardsRemaining = {
        blueTeamNumCardsLeft: blueRemainingCards, redTeamNumCardsLeft: 0
      }
    }
  }

  return updatedCardsRemaining
}
