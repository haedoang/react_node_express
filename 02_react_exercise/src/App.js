import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import LoginPage from './page/login/LoginPage';
import MainPage from './page/main/MainPage';

class App extends React.Component {

  render(){
    return (
      <Router>
        <Switch>
          <Route path="/">
            {this.props.session ? <MainPage/> : <LoginPage/> }
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
