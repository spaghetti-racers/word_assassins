const firebase = require('firebase')

// -- // -- // -- // Firebase Config // -- // -- // -- //
const config = {
  apiKey: 'AIzaSyB-pbTEKEHqTPXYHtn5lgPa_AZXwP2Qkfs',
  authDomain: 'word-assassins-98861.firebaseapp.com',
  databaseURL: 'https://word-assassins-98861.firebaseio.com',
  projectId: 'word-assassins-98861',
  storageBucket: 'word-assassins-98861.appspot.com',
  messagingSenderId: '865993567603'
}
// -- // -- // -- // -- // -- // -- // -- // -- // -- //

// Initialize the app, but make sure to do it only once.
//   (We need this for the tests. The test runner busts the require
//   cache when in watch mode; this will cause us to evaluate this
//   file multiple times. Without this protection, we would try to
//   initialize the app again, which causes Firebase to throw.
//
//   This is why global state makes a sad panda.)
firebase.__bonesApp || (firebase.__bonesApp = firebase.initializeApp(config))

module.exports = firebase
