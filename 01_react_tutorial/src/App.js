import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import MainPage from './page/main/MainPage';
import MobilePage from './page/mobile/MobilePage';
import LoginPage from './page/login/LoginPage';


class App extends React.Component {
  render(){
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/c/:url">
              <MobilePage/>
            </Route>
            <Route> 
              {this.props.session ? <MainPage/> : <LoginPage/>}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  } 
}

export default App;
