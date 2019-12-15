import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register';
import Home from './components/Home';
import Orders from './components/Orders';
import Profile from './components/Profile';
import History from './components/History';
import Edit from './components/Edit';
import Product from './components/Product';
import Wallet from './components/Wallet';

function App() {
  return (
    <Router>
      <div className="App" style={{ margin: 0 }}>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/profile/edit" component={Edit}></Route>
          <Route path="/profile/product" component={Product}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/wallet" component={Wallet}></Route>
          <Route path="/history" component={History}></Route>
          <Route path="/order" component={Orders}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/" exact component={Home}></Route>
          <Redirect from="*" to="/"></Redirect>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
