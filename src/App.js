import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Dashboard from './Components/Dashboard.js';
import Login from './Components/Login'

function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/logout">
          <div>logout</div>
        </Route>
        <Route path="/register">
          <div>register</div>
        </Route>
        <Route path="/Dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <div>Home</div>
        </Route>
      </Switch>
  </Router>
  );
}

export default App;
