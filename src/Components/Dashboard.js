import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import DashboardSideBar from './DashboardSideBar';
import styled from 'styled-components';
import AllProjectPage from './ProjectPage/AllProjectPage';
import AllModelsPage from './ModelsPage/AllModelsPage';
import AllUsersPage from './UsersPage/AllUsersPage';
import SettingsPage from './SettingsPage/SettingsPage';

const DashboardContainer = styled.div`
  margin-left: 250px; /* Set the width of the sidebar */
  padding: 74px;
  padding-top: 40px;
`;

function Dashboard() {
  let match = useRouteMatch();

  return (
    <div>
      <DashboardSideBar />
      <DashboardContainer>
        <Switch>
          <Route path={`${match.path}/users`} component={AllUsersPage}></Route>
          <Route
            path={`${match.path}/models`}
            component={AllModelsPage}
          ></Route>
          <Route
            path={`${match.path}/projects`}
            component={AllProjectPage}
          ></Route>
          <Route
            path={`${match.path}/settings`}
            component={SettingsPage}
          ></Route>
          <Route path={match.path} component={AllProjectPage}></Route>
        </Switch>
      </DashboardContainer>
    </div>
  );
}

export default Dashboard;
