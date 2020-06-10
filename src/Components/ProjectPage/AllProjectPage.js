import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProjectCard from './ProjectCard';
import DataUploadForm from './DataUploadForm';
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

function Project() {
  let { projectId } = useParams();
  return <h3>Requested project ID: {projectId}</h3>;
}

export default function AllProjectPage() {
  const [projectIdList, setProjectIdList] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [displayCreationForm, setDisplayCreationForm] = useState(false);
  const classes = useStyles();
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
        {/* To be refactored afterwards */}
        <Route path={`${match.path}/data`}>
          <DataUploadForm />
        </Route>
        <Route path={`${match.path}/:projectId`}>
          <Project />
        </Route>
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
