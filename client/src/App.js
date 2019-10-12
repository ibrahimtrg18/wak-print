import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from './components/content/Dashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Pesanan from './components/content/Pesanan';
import Riwayat from './components/content/Riwayat';
import Profile from './components/content/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={SignIn}></Route>
          <Route path="/register" component={SignUp}></Route>
          <Route path="/pesanan" component={Pesanan}></Route>
          <Route path="/riwayat"  component={Riwayat}></Route>
          <Route path="/profile"  component={Profile}></Route>
          <Route path="/" exact component={Dashboard}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
