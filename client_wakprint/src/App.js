import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register';
import Beranda from './components/Beranda';

function App() {
  return (
    <Router>
      <div className="App" style={{ margin: 0 }}>
        <Switch>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/" component={Beranda}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
