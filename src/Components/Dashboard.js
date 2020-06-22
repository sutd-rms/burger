import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import DashboardSideBar from './DashboardSideBar';
import FloatingAddButton from './FloatingAddButton';
import styled from 'styled-components';
import AllProjectPage from './ProjectPage/AllProjectPage';
import AllModelsPage from './ModelsPage/AllModelsPage';
import AllUsersPage from './UsersPage/AllUsersPage';

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
          <Route
            path={`${match.path}/dashboards`}
            component={Dashboards}
          ></Route>
          <Route path={`${match.path}/users`} component={AllUsersPage}></Route>
          <Route
            path={`${match.path}/models`}
            component={AllModelsPage}
          ></Route>
          <Route
            path={`${match.path}/projects`}
            component={AllProjectPage}
          ></Route>
          <Route path={match.path}></Route>
        </Switch>
      </DashboardContainer>
    </div>
  );
}

function Dashboards() {
  let match = useRouteMatch();

  return (
    <div>
      <p>Dashboards page</p>
    </div>
  );
}

export default Dashboard;
