import React, { useState, useEffect } from 'react';
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
import ProjectDetails from './ProjectDetails';
import axios from 'axios';
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
  const [projectIdList, setProjectIdList] = useState([]);
  const [displayCreationForm, setDisplayCreationForm] = useState(false);
  let match = useRouteMatch();

  useEffect(() => {
    let token = localStorage.getItem('token');
    // console.log(match)
    axios
      .get('https://secret-sauce.azurewebsites.net/portal/projects/', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(data => setProjectIdList(data.data));
  }, []);

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
                  <Grid key={value.id} item>
                    <ProjectCard project={value} />
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
