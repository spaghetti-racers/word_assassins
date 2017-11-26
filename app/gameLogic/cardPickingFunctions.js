export const updateCardsRemaining = function(cardColor, blueRemainingCards, redRemainingCards) {
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
  return updatedCardsRemaining
}
