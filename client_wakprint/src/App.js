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
          <header className="App-header">
            <Route path="/register" component={Register}></Route>
            <Route path="/beranda" component={Beranda}></Route>
            <Route path="/" exact component={Login}></Route>
          </header>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
