import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import Dashboard from './Components/Dashboard.js';
import Login from './Components/Login';
import PasswordReset from './Components/PasswordReset';
import PasswordResetConfirm from './Components/PasswordResetConfirm';
import { DashboardRoute, LoginRoute } from './SpecialRoutes';

function App() {
  return (
    <Switch>
      <LoginRoute path="/login" component={Login} />
      <Route path="/logout">
        <div>logout</div>
      </Route>
      <Route path="/register">
        <div>register</div>
      </Route>
      <Route
        path="/password-reset/confirm/:id/:token"
        component={PasswordResetConfirm}
      />
      <Route path="/password-reset">
        <PasswordReset />
      </Route>
      <DashboardRoute path="/Dashboard" component={Dashboard} />
      <LoginRoute path="/" component={Login} />
    </Switch>
  );
}

export default App;
