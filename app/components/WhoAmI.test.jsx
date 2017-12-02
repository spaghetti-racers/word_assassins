import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))
import {createStore} from 'redux'

import WhoAmIContainer, {WhoAmI} from './WhoAmI'
import Login from './Login'

/* global describe it beforeEach */
describe('<WhoAmI/>', () => {
  describe('when nobody is logged in', () => {
    let root
    beforeEach('render the root', () =>
      root = shallow(<WhoAmI/>)
    )

  })

  describe('when an anonymous user is logged in', () => {
    const user = {
      displayName: null,
      isAnonymous: true,
    }
    let root
    beforeEach('render the root', () =>
      root = shallow(<WhoAmI user={user}/>)
    )

    it('says hello to Anonymous', () => {
      expect(root.text()).to.contain('Anonymous')
    })

    it('displays a Login component', () => {
      expect(root.find(Login)).to.have.length(1)
    })
  })

  describe('when a user is logged in', () => {
    const user = {
      isAnonymous: false,
      displayName: 'Grace Hopper',
    }
    const fakeAuth = {signOut: spy()}
    let root
    beforeEach('render the root', () =>
      root = shallow(<WhoAmI user={user} auth={fakeAuth}/>)
    )

  })
})
