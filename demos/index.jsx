'use strict'
import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'
import { Container, Header, Table, Button, Segment, Grid, Image } from 'semantic-ui-react'
import WhoAmI from '../app/components/WhoAmI'
import Lobby from '../app/components/Lobby'

import Scratchpad from './scratchpad'
import Whiteboard from './whiteboard'
import Chat from './chat'
import firebase from 'APP/fire'
const auth = firebase.auth()

const Index = ({ children }) =>

  <div style={{ backgroundColor: 'red', height: '102vh' }}>
    <Grid columns="three">
      <Grid.Row>
        <Grid.Column>

          <Image src='http://www.supercoloring.com/sites/default/files/silhouettes/2015/05/spy-girl-black-silhouette.svg' />

        </Grid.Column>
        <Grid centered columns={1}>
          <Grid.Row>
            <h1>Welcome</h1>
          </Grid.Row>
          <Grid.Row>
            <h1>to</h1>
          </Grid.Row>
          <Grid.Row>
            <h1>Word Assassins</h1>
          </Grid.Row>
          <Grid.Row>
            <Button>
              <Link to={'/lobby'} component={Lobby} style={{color: 'blue'}}>Lobby</Link>
            </Button>
          </Grid.Row>
        </Grid>
        <Grid.Column>
          <Image src='https://openclipart.org/image/2400px/svg_to_png/245102/Spy-Silhouette.png' />
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
