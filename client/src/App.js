import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import Navbar from "./components/layout/Navbar"
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/layout/Dashboard";
import Pesanan from './components/dashboard/Pesanan';
import Riwayat from './components/dashboard/Riwayat';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact component={SignUp}></Route>
          <Route path="/register" component={SignUp}></Route>
          <Route path="/login" component={SignIn}></Route>
          <Route path="/dashboard/" exact component={Dashboard}></Route>
          <Route path="/dashboard/pesanan" exact component={Pesanan}></Route>
          <Route path="/dashboard/riwayat" exact component={Riwayat}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
