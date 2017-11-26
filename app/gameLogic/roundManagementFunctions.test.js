
//import firebase from 'APP/fire'
import getCurrentRoundsWonScore from './roundManagementFunctions.js'

function testGetCurrentRoundsWonScore() {
  let score = []
  score = getCurrentRoundsWonScore('-KzpmIrLnIhhVNAVGtto')
  console.log('score', score)
}
