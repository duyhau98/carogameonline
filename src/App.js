/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar'
import './App.css';
import Game from './components/Game';
import Register from './components/register/register';
import Login from './components/login/login';
import Logout from './components/logout/logout';
import UserDetail from './components/UserDetail/UserDetail'
import StartGame from './components/startgame/startgame';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router >
      <div>
        <Navbar />
        <div style={{ marginTop: '100px' }}>
          <Route key="1" exact path="/" component={StartGame} />
          <Route key="2" exact path="/register" component={Register} />
          <Route key="3" exact path="/login" component={Login} />
          <Route key="4" exact path="/logout" component={Logout} />
          <Route key="5" exact path="/userdetail" component={UserDetail} />
          <Route key="6" exact path="/game" component={Game} />
        </div>
      </div>
    </Router>
  );
}


export default App;
