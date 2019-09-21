import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/layout/Dashboard";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={SignUp}></Route>
          <Route path="/register" component={SignUp}></Route>
          <Route path="/login" component={SignIn}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
