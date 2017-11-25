import firebase from 'APP/fire'

// THIS FUNCTION RANDOMLY SELECTS 25 WORDS FROM ALL WORDS
export function generateSelectedWordsGC(allWords) {
  const selectedWords = []
  while (selectedWords.length < 25) {
    const randomIndex = Math.floor(Math.random() * (allWords.length))
    if (!selectedWords.includes(allWords[randomIndex])) {
      selectedWords.push(allWords[randomIndex])
    }
  }
  return selectedWords
}

// HELPER FUNCTION TO SHUFFLE AN ARRAY, USED FOR SHUFFLING THE COLORS
export function shuffleArrayGC(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// THIS FUNCTION TAKES IN THE TEAM THAT GOES FIRST AND CREATES SHUFFLES ARRAY WITH THE RIGHT AMOUNT OF COLORS FOR A 5X5 BOARD.
export function generateColorsGC(whoGoesFirst, shuffleArrayFunc) {
  let colors = []
  if (whoGoesFirst === 'redTeam') {
    colors = ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'black']
  } else {
    colors = ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'black']
  }
  return shuffleArrayFunc(colors)
}

// THIS FUNCTION MAKES 25 CARDS USING OUR RANDOM WORDS AND RANDOM COLORS, AND ADDS THEM TO THE DB
export function generateCardsGC(selectedWords, shuffledColorArray, whoGoesFirst, gameId) {
  const gameCardObject = selectedWords.reduce((accum, word, index) => {
    accum[index] = {
      word: word.toUpperCase(),
      clicked: false,
      color: shuffledColorArray[index]
    }
    return accum
  }, {})
  firebase.database().ref(`/gameInstances/${gameId}/gameCards`).update(gameCardObject)
}
