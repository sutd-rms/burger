import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import DashboardSideBar from "./DashboardSideBar";
import FloatingAddButton from "./ProjectPage/FloatingAddButton";
import styled from "styled-components";
import AllProjectPage from "./ProjectPage/AllProjectPage";

const DashboardContainer = styled.div`
  margin-left: 250px; /* Set the width of the sidebar */
  padding: 10px;
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
          <Route path={`${match.path}/users`} component={Users}></Route>
          <Route path={`${match.path}/models`} component={Models}></Route>
          <Route path={`${match.path}/projects`} component={Projects}></Route>
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
      <h3>Dashboards page</h3>
    </div>
  );
}

function Users() {
  let match = useRouteMatch();
  let onCreate = () => {
    console.log("Creating new user...");
  };

  return (
    <div>
      <FloatingAddButton onClick={onCreate} />
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

  let onCreate = () => {
    console.log("Creating new model...");
  };

  return (
    <div>
      <FloatingAddButton onClick={onCreate} />
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

  let onCreate = () => {
    console.log("Creating new project...");
  };

  return (
    <div>
      <FloatingAddButton onClick={onCreate} />
      <Switch>
        <Route path={`${match.path}/:projectId`}>
          <Project />
        </Route>
        <Route path={match.path}>
          <AllProjectPage />
        </Route>
      </Switch>
    </div>
  );
}

function Project() {
  let { projectId } = useParams();
  return <h3>Requested project ID: {projectId}</h3>;
}

export default Dashboard;
