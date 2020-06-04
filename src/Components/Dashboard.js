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
import FloatingAddButton from "./FloatingAddButton";
import styled from "styled-components";
import AllProjectPage from "./ProjectPage/AllProjectPage";
import AllModelsPage from "./ModelsPage/AllModelsPage";

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

// function Models() {
//   let match = useRouteMatch();

//   let onCreate = () => {
//     console.log("Creating new model...");
//   };

//   return (
//     <div>
//       <FloatingAddButton onClick={onCreate} />
//       <Switch>
//         <Route path={`${match.path}/:modelId`}>
//           <Model />
//         </Route>
//         <Route path={match.path}>
//           <AllModelsPage />
//         </Route>
//       </Switch>
//     </div>
//   );
// }

export default Dashboard;
