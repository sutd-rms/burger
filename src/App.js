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
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <div>Home</div>
        </Route>
      </Switch>
  </Router>
  );
}

function Dashboard() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/users`}>
          <Users />
        </Route>
        <Route path={`${match.path}/models`}>
          <Models />
        </Route>
        <Route path={`${match.path}/projects`}>
          <Projects />
        </Route>
        <Route path={match.path}>
          <h3>Dashboard Content</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Users() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:userId`}>
          <User />
        </Route>
        <Route path={match.path}>
          <h3>Please select a user.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function User() {
  let { userId } = useParams();

  return <h3>Requested user ID: {userId}</h3>;
}

function Models() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:modelId`}>
          <Model />
        </Route>
        <Route path={match.path}>
          <h3>Please select a model.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Model() {
  let { modelId } = useParams();
  return <h3>Requested model ID: {modelId}</h3>;
}

function Projects() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:projectId`}>
          <Project />
        </Route>
        <Route path={match.path}>
          <h3>Please select a project.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Project() {
  let { projectId } = useParams();
  return <h3>Requested project ID: {projectId}</h3>;
}

export default App;
