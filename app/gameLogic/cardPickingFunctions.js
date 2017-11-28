export const updateCardsRemaining = function(cardColor, blueRemainingCards, redRemainingCards, activeTeam) {
  let updatedCardsRemaining = {}
  if (cardColor === 'blue') {
    updatedCardsRemaining = {
      blueTeamNumCardsLeft: blueRemainingCards - 1, redTeamNumCardsLeft: redRemainingCards
    }
  } else if (cardColor === 'red') {
    updatedCardsRemaining = {
      blueTeamNumCardsLeft: blueRemainingCards, redTeamNumCardsLeft: redRemainingCards - 1
    }
  } else if (cardColor === 'black') {
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

export const updateNextRoundStatus = function(blueRemainingCards, redRemainingCards) {
  console.log('!!!!!!', blueRemainingCards, redRemainingCards)
  if (blueRemainingCards===0 || redRemainingCards===0) return true
  else return false
}

export const updateGuessesAllowed = function(cardColor, displayHint, activeTeam) {
  let newNumGuessesAllowed = 0
  if (cardColor === activeTeam.slice(0, -4)) {
    newNumGuessesAllowed = displayHint.numOfWordGuesses - 1
  } else {
    newNumGuessesAllowed = 0
  }
  return {hintToDisplay: displayHint.hintToDisplay, numOfWordGuesses: newNumGuessesAllowed}
}
