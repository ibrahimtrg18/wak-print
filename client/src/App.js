import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from './components/SignIn';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={SignIn}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
