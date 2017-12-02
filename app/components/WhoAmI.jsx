import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'
import { Button } from 'semantic-ui-react'

import firebase from 'APP/fire'

const auth = firebase.auth()

import Login from './Login'
import Lobby from './Lobby'

export const name = user => {
  if (!user) return ''
  if (user.isAnonymous) return 'Anonymous'
  return user.displayName || user.email
}

export const WhoAmI = ({ user, auth }) =>
  <div className="whoami">
    {
      (!user || user.isAnonymous) ?
      <div></div>:
    <Button style={{ position: 'relative', top: '-150px' }}>
      <Link to={'/lobby'} component={Lobby} style={{ color: 'blue' }}>Lobby</Link>
    </Button>
    }
    <h3 style={{ position: 'relative', top: '-270px' }} className="whoami-user-name"> {name(user)}</h3>
    { // If nobody is logged in, or the current user is anonymous,
      (!user || user.isAnonymous) ?
        // ...then show signin links...
        <Login auth={auth} />
        /// ...otherwise, show a logout button.
        : <Button style={{ position: 'relative', top: '-100px', color: 'blue', backgroundColor: 'DarkGrey' }} className='logout' onClick={() => auth.signOut()}>Logout</Button>
    }
  </div>

export default class extends React.Component {
  componentDidMount() {
    const { auth } = this.props
    this.unsubscribe = auth.onAuthStateChanged(user => this.setState({ user }))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { user } = this.state || {}
    return <WhoAmI user={user} auth={auth} />
  }
}
