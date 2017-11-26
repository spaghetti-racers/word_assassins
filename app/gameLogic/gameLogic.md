

------------------------------------
--DB model for currentGameStatus = {
  
  whoGoesFirst: redTeam
  activeTeam: redTeam (Enum),
  spyMasterWaitingForHint: true,
  spyMasterConfirmingHint: false,
  guesserTurnToSelectWordOnBoard: false,
  currentHint: boolean. Or the actually hint word here? Look at this and confirm its a boolean
  numOfGuessesAllowedCurrently: 0,
  currentStateOfBoard: [{}, {}, {}]
  RoundsWonBy Teams : {blueTeamNumRoundsWon: 0, redTeamNumRoundsWon: 0}
  cardsRemaining: {blueTeamNumCardsLeft: 9, redTeamNumCardsLeft}
  displayHint: {numGuessesAllowed: 3, word: ‘blank’}
  roundActive: false
}

*how is spymaster set/tracked
----------------------------------------------
Game Logic Functions to be created.

-Pick random team to go first when a new game is created.
-Card Guessing logic
	-If correct card:
		-current team’s number of cards left, -1
			-if current team’s NumCardsLeft === 0: Current team wins!!! (USE ROUND END LOGIC)
		-number of guesses allowed, -1
		-if number of guesses === 0, then guesserTurnToSelectWordOnBoard is set to false, activeTeam switches, spyMasterWaitingForHint is set to true, spyMasterConfirmingHint set to false.
	-If select opposing team’s card:
		-opposing team’s number of cards left, -1
			-if opposing team’s NumCardsLeft === 0: Opposing team wins!!! (USE ROUND END LOGIC)
		-number of guesses allowed, set to 0
		-guesserTurnToSelectWordOnBoard is set to false, activeTeam switches, spyMasterWaitingForHint is set to true.
	-If select neutral card:
		-number of guesses allowed, set to 0
		-guesserTurnToSelectWordOnBoard is set to false, activeTeam switches, spyMasterWaitingForHint is set to true.
	-If select assassin card:
		-active team loses.
		-ROUND ENDS (USE ROUND END LOGIC)
	-if team passes (click done button)
		-number of guesses allowed, set to 0
		-guesserTurnToSelectWordOnBoard is set to false, activeTeam switches, spyMasterWaitingForHint is set to true.

-Round End Logic
	-RoundsWonByTeams: +1 to winning team.
		-if winning team’s NumRoundsWon === goal number of wins, then game over and winning team wins.  
			-Reset the following in DB:
				RoundsWon for both teams to 0. 
				activeTeam.
				cardsRemaining for both teams
			(Add a new game button? Same functionality as new round button?)
		ELSE:
		-reassign the spymasters & guessers.
			-if guesser, now spyMaster
			-if spyMaster, now guesser
		-whoGoesFirst value
			-if was redTeam, set to blueTeam
			-if was blueTeam, set to redTeam
		-ActiveTeam set to same team as whoGoesFirst
		-spyMasterWaitingForHint: true
		-spyMasterConfirmingHint: false
		-guesserTurnToSelectWordOnBoard: false

-Able to click/game view logic
	-if I am a spyMaster
		-I can’t click on cards.
		-I do not have a done/pass button.
		-I can see, but not type into the general chat
		-I can see and type into the spymaster chat
	-if I am a guesser on the active team
		-I can click on a card to make a guess
		-I can click on the done/pass button to end my team’s turn
		-I can see and type into the general chat
		-I can’t see the spymaster chat
	-if I am a guesser on the nonactive team
		-I can’t click any cards
		-I do not have a done/pass button
		-I can see and type into the general chat
		-I can’t see the spymaster chat

	-The current teams turn should be clearly identifiable on the screen
	-When a guesser or spyMaster’s turn ends, it should be clearly identifiable to the next person that it is now their turn


		
