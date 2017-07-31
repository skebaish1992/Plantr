import AboutUs from './About/AboutUs'
import AuthService from './config/AuthService.js';
import Forum from './Forum/Forum';
import Friends from './Friends/Friends'
import Categories from './Forum/Categories'
import GardenSquareGridView from './GardenSquareGrid/getGardenSquareGrid';
import { HashRouter as BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './Home/Home'
import Login from './config/Login.js';
import MakeGardenSquareGridView from './GardenSquareGrid/makeGardenSquareGrid';
import NavBar from './NavBar';
import Profile from './userProfile/Profile';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import setProfile from './Actions/UserActions';
import store from './store';

const auth = new AuthService('vBOwXk8xIgy3kroSs5vz1TFfrYyFQNFf', 'skebaish1992.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/' });
  }
};

class App extends Component {
  constructor() {
    super()
    this.state = {
      profile: ''
    }
    auth.on('profile_updated', (profile) => {
      this.setState({profile: profile});
    })
  }

  componentDidMount() {
    this.setState({profile: auth.loggedIn()});
  }

  renderComponents() {
    if (!this.state.profile) {
      return (
        <div>
          <Login profile={this.state.profile} auth={auth}/>
        </div>
      );
    } else {
      const profile = auth.getProfile();
      store.getState().userProfileReducer.profile = profile
      return (
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Route render={ () => (
                <NavBar profile={profile} />
              )} />
              <div className="container-fluid">
                <Route exact path="/" render={ () => (
                  <Home profile={profile} />
                )} />
                <Route path="/home" render={ () => (
                  <Home profile={profile} />
                )} />
                <Route path="/login" component={Login}></Route>
                <Route path="/about" render={ () => (
                  <AboutUs profile={profile} />
                )} />
                <Route path="/squares" render={ () => (
                  <GardenSquareGridView profile={profile} />
                )} />
                <Route path="/creategarden" render={ () => (
                  <MakeGardenSquareGridView profile={profile} />
                )} />
                <Route path="/Friends" render={ () => (
                  <Friends profile={profile} />
                )} />
                <Route path="/profile" component={Profile} />
                <Route path="/forum" render={ () => (
                  <Categories profile={profile} />
                )} />
              </div>
            </div>
          </BrowserRouter>
        </Provider>
        );
      }
    }

  render() {
    return (
      <div>
        {this.renderComponents()}
      </div>
    )
  }
};

export default auth;

ReactDOM.render(<App />,
    document.getElementById('app')
);
