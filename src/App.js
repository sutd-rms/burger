import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Dashboard from './Components/Dashboard.js';

function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/login">
          <div>login</div>
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
