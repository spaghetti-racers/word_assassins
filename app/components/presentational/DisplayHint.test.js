import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))
import {createStore} from 'redux'

import DisplayHint from './DisplayHint'
import DisplayHintContainer from '../container/DisplayHintContainer'

/* global describe it beforeEach */
describe('<DisplayHint/>', () => {
  describe('hint to display', () => {
    let root
    beforeEach('render the root', () =>
      root = shallow(<DisplayHint/>)
    )

  })

  describe('check number of cards remaining for both teams', () => {
    const hintWord = 'cat'
    const hintNumGuessesAllowed = 7
    let root
    beforeEach('render the root', () =>
      root = shallow(<DisplayHint hintWord={hintWord} hintNumGuessesAllowed={hintNumGuessesAllowed}/>)
    )

    it('checks title', () => {
      const title = root.find('h3')
      expect(title.length).to.be.equal(1)
    })

    it('checks displayHint tags', () => {
      const teams = root.find('h5')
      expect(teams.length).to.be.equal(2)
    })
  })
})
