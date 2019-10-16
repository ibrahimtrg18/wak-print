import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register';

function App() {
  return (
    <div className="App" style={{margin: 0}}>
      <Router>
        <header className="App-header">
          <Route path="/register" component={Register}></Route>
          <Route path="/" exact component={Login}></Route>
        </header>
      </Router>
    </div>
  );
}

export default App;
