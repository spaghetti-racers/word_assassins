import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))
import {createStore} from 'redux'

import CardsRemaining from './CardsRemaining'
import CardsRemainingContainer from '../container/CardsRemainingContainer'

/* global describe it beforeEach */
describe('<CardsRemaining/>', () => {
  describe('num cards left', () => {
    let root
    beforeEach('render the root', () =>
      root = shallow(<CardsRemaining/>)
    )

  })

  describe('check number of cards remaining for both teams', () => {
    const numCardsLeftRed = 5
    const numCardsLeftBlue = 7
    let root
    beforeEach('render the root', () =>
      root = shallow(<CardsRemaining numCardsLeftRed={numCardsLeftRed} numCardsLeftBlue={numCardsLeftBlue}/>)
    )

    it('checks title', () => {
      const title = root.find('h3')
      expect(title.length).to.be.equal(1)
    })

    it('checks cardsRemaining tags', () => {
      const teams = root.find('h5')
      expect(teams.length).to.be.equal(2)
    })
  })

})
