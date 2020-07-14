import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProjectCard from './ProjectCard';
import ConstraintSetPage from './ConstraintSetPage';
import DashboardTopNav from './../DashboardTopNav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import FloatingAddButton from '../FloatingAddButton';
import ProjectCreationForm from './ProjectCreationForm';
import ProjectDetails from './ProjectDetails';
import DatasetVisualisation from './../DatasetVisualisation';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 5
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(5)
  }
}));

export default function AllProjectPage() {
  const [projectIdList, setProjectIdList] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [displayCreationForm, setDisplayCreationForm] = useState(false);
  let match = useRouteMatch();

  const handleOpen = () => {
    setDisplayCreationForm(true);
  };

  const handleClose = () => {
    setDisplayCreationForm(false);
  };

  return (
    <div>
      <Switch>
        <Route
          path={`${match.path}/:projectId/dataset/:datasetId/`}
          component={DatasetVisualisation}
        />
        <Route
          path={`${match.path}/:projectId/constraintset/:constraintsetId/`}
          component={ConstraintSetPage}
        />
        <Route path={`${match.path}/:projectId`} component={ProjectDetails} />
        <Route path={match.path}>
          <DashboardTopNav title="projects" />
          <FloatingAddButton onClick={handleOpen} />
          <ProjectCreationForm
            open={displayCreationForm}
            handleClose={handleClose}
          />
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Grid container justify="flex-start" spacing={7}>
                {projectIdList.map(value => (
                  <Grid key={value} item>
                    <ProjectCard projectId={value} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Route>
      </Switch>
    </div>
  );
}
