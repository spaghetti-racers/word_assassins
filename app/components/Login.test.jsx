import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))

import Login from './Login'

/* global describe it beforeEach */
describe('<Login />', () => {
  let root, fakeAuth
  beforeEach('render the root', () => {
    fakeAuth = {
      signInWithPopup: spy(),
      signInWithRedirect: spy(),
    }
    root = shallow(<Login auth={fakeAuth}/>)
  })


})
