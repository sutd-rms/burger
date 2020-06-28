import { store } from './redux/store';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const DashboardRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const token = localStorage.getItem('token');
      const expiry = localStorage.getItem('expiry');
      const currentTime = new Date().getTime();
      if (currentTime < expiry && token) {
        return <Component {...props} />;
      } else {
        localStorage.clear();
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        );
      }
    }}
  />
);
