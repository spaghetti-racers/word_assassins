import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))
import {createStore} from 'redux'

import RoundsWon from './RoundsWon'
import RoundsWonContainer from '../container/RoundsWonContainer'

/* global describe it beforeEach */
describe('<RoundsWon/>', () => {
  describe('Num Rounds Won', () => {
    let root
    beforeEach('render the root', () =>
      root = shallow(<RoundsWon/>)
    )
  })

  describe('number of rounds won per team', () => {
    const roundsWonByTeamsRed = 2
    const roundsWonByTeamsBlue = 3
    let root
    beforeEach('render the root', () =>
      root = shallow(<RoundsWon roundsWonByTeamsRed={roundsWonByTeamsRed} roundsWonByTeamsBlue={roundsWonByTeamsBlue}/>)
    )

    it('checks title', () => {
      const title = root.find('h3')
      expect(title.length).to.be.equal(1)
    })

    it('checks roundsWon tags', () => {
      const teams = root.find('h5')
      expect(teams.length).to.be.equal(2)
    })
  })
})
