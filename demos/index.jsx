'use strict'
import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'
import { Container, Header, Table, Button, Segment, Grid, Image } from 'semantic-ui-react'
import WhoAmI from '../app/components/WhoAmI'
import Lobby from '../app/components/Lobby'
import MaleSpy from '../public/BondSpy.png'
import FemaleSpy from '../public/Woman-Spy-Silhouette.png'
import Scratchpad from './scratchpad'
import Whiteboard from './whiteboard'
import Chat from './chat'
import firebase from 'APP/fire'

const auth = firebase.auth()

const Index = ({ children }) =>

  <div style={{ backgroundColor: 'red' }}>
    <Grid columns="three">
      <Grid.Row style={{height: '90vh'}}>
        <Grid.Column>
          <Image className='maleSpy' src={MaleSpy} />
        </Grid.Column>
        <Grid centered columns={1}>
          <Grid.Row>
            <h1 style={{fontSize: '55px'}}>Welcome</h1>
          </Grid.Row>
          <Grid.Row>
            <h1 style={{fontSize: '55px'}}>to</h1>
          </Grid.Row>
          <Grid.Row>
            <h1 style={{fontSize: '55px'}}>Word Assassins</h1>
          </Grid.Row>

        </Grid>
        <Grid.Column height={1}>
          <Image className='femaleSpy' src={FemaleSpy} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <div style={{ textAlign: 'center' }}>
      <WhoAmI auth={auth} />

    </div>

  </div>

export default <Route path="/home" component={({ children }) => children}>
  <IndexRoute component={Index} />
  <Route path='scratchpad/:title' component={Scratchpad} />
  <Route path='whiteboard/:title' component={Whiteboard} />
  <Route path='chat/:room' component={Chat} />
</Route>
