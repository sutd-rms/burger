import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DashboardTopNav from './../DashboardTopNav';
import UsersTable from './UsersTable';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams
} from 'react-router-dom';

const useStyles = makeStyles(theme => ({}));

export default function AllUsersPage() {
  const classes = useStyles();

  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:userId`}>
          <User />
        </Route>
        <Route path={match.path}>
          <DashboardTopNav title="user management" />
          <UsersTable />
        </Route>
      </Switch>
    </div>
  );
}

function User() {
  let { userId } = useParams();

  return <h3>Requested user ID: {userId}</h3>;
}
