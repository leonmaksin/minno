import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import App from '../App'
// import Login from './Login'
// import Landing from './Landing'
// import SocialFeed from './SocialFeed'
// import ExploreFeed from './ExploreFeed'
// import Profile from './Profile'
// import Playlist from './Playlist'
// import Follow from './Follow'
// import Unread from './Unread'
// import Admin from './Admin'

type Props = {}

class RootContainer extends Component<Props> {

  render () {
    return (
      <Provider store={store}>
        <Router>
          <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Switch>
              {/* <Route path='/login' component={Login} />
              <Route path='/landing' component={Landing} />
              <Route path='/privacy' render={() => {window.location.href='privacy_policy.html'}} /> */}
              <Route path='/' component={App} />
            </Switch>
          </Container>
        </Router>
      </Provider>
    )
  }
}

export default RootContainer

export const routeConfig = [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/',
        component: App,
        exact: true
      },
    //   {
    //     path: '/explore',
    //     component: ExploreFeed
    //   },
    //   {
    //     path: '/profile/:id',
    //     component: Profile
    //   },
    //   {
    //     path: '/follow',
    //     component: Follow
    //   },
    //   {
    //     path: '/collection/:id',
    //     component: Playlist
    //   },
    //   {
    //     path: '/unread',
    //     component: Unread
    //   },
    //   {
    //     path: '/post/:id',
    //     component: NativeReader
    //   },
    //   {
    //     path: '/admin',
    //     component: Admin
    //   }
    ]
  },
//   {
//     path: '/login',
//     component: Login
//   }
]
