import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Login from './components/Login'

function App() {
  return (
    <div className="App" style={{margin: 0}}>
      <Router>
        <header className="App-header">
          <Route path="/" component={Login}></Route>
        </header>
      </Router>
    </div>
  );
}

export default App;
