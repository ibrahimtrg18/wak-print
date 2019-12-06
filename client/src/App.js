import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register';
import Home from './components/Home';
import Orders from './components/Orders';
import Profile from './components/Profile';
import History from './components/History';

function App() {
  return (
    <Router>
      <div className="App" style={{ margin: 0 }}>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/history" component={History}></Route>
          <Route path="/order" component={Orders}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/" exact component={Home}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
