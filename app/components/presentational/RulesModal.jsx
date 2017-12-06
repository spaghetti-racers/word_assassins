import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

const RulesModal = () =>
  (<Modal trigger={<Button style={{backgroundColor: '#EDC832'}}>Instructions</Button>} closeIcon>
    <Modal.Header></Modal.Header>
    <Modal.Content image scrolling>

      {/* ~~UCOMMENT TO ADD AN IMAGE TO THE MODAL~~
        <Image
          size='medium'
          src='/assets/images/wireframe/image.png'
          wrapped
      /> */}

      <Modal.Description>
        <Header style={{fontSize: '25'}}>Word Assassins Instructions for General Play</Header>
        <p>Word Assassins is played by two teams of two players, the Red team and Blue team.</p>

        <p>In the game screen all four players can see a grid of 25 words <br></br> On each team one player is the Spymaster and their teammate is the Guesser.</p>

        <p>The goal of the game is to have your team’s Guesser reveal all of your team’s cards before <br></br>the the other team reveal’s theirs. Each team’s turn consists of two phases:</p>

        <p style={{textDecoration: 'underline', fontWeight: 'bold'}}>Phase 1 - Submitting the Hint</p>
        <p>The two Spymasters are able to see which words are associated with which color, the guessers are not.</p>
        <p> When it is the Blue team’s turn, the Blue teams Spymaster looks at the board and enters a one word hint <br></br>and the number of Blue words that they want the Blue Guesser to click based on that hint. <br></br>(proper nouns like “New York” can be multiple words)</p>

        <p>An example hint might be: "CAKE, 3" With the goal of trying to get their teammate to select <br></br>the words "DESSERT", "CHOCOLATE", and "SWEET".</p>

        <p>After a hint and number are entered by the Blue Spymaster, the Red team’s Spymaster then reviews <br></br>the hint to make sure it is legal and either confirms it or requests a change. <br></br>Once confirmed the Blue Spymaster submits the hint and the next phase begins.</p>

        <p style={{textDecoration: 'underline', fontWeight: 'bold'}}>Phase 2 - Guessing</p>
        <p>All players can now see the hint word, the number of words the spymaster says are associated, <br></br>and the number of remaining guesses the Blue Guesser has.</p>

        <p>The Blue Guesser now has to decide which words on the board their teammate is hinting at. Once the guesser decides <br></br>on a word to guess, they click a card, the color of the card is revealed, and the word is hidden. Now one of 4 things happen:</p>

        <p>If the card selected is Blue, the number of Blue cards remaining to win the round decreases by one. If there are still guesses <br></br>remaining, the Guesser can keep guessing or click the pass button to end their turn.</p>

        <p>If the card is Red, the number of Red cards remaining to win the round decreases by one. Then the Blue team’s turn ends and <br></br>the Red team Spymaster gets to set a hint, starting the process over again.</p>

        <p>If the card is white, then neither Red or Blue cards remaining decrease and the Blue team’s turn ends. The Red team Spymaster <br></br>gets to set a hint, starting the process over again.</p>

        <p>If the card is the lone gray assassin card, then the entire round ends and the team that clicked it loses the round.</p>
      </Modal.Description>
    </Modal.Content>
    {/* <Modal.Actions>
      <Button primary> ~~ Uncomment to institute button, but button needs link
        Proceed <Icon name='right chevron' />
      </Button>}
    </Modal.Actions> */}
  </Modal>)

export default RulesModal
