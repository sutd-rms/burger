import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import ProjectCard from './ProjectCard';
import ConstraintSetPage from './ConstraintSetPage';
import DashboardTopNav from './../DashboardTopNav';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import FloatingAddButton from '../FloatingAddButton';
import ProjectCreationForm from './ProjectCreationForm';
import ProjectDetails from './ProjectDetails';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import DatasetVisualisation from './../DatasetVisualisation';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

export default function AllProjectPage() {
  const classes = useStyles();

  const [projectIdList, setProjectIdList] = useState([]);
  const [displayCreationForm, setDisplayCreationForm] = useState(false);
  const [dataloading, setDataloading] = useState(true);
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
      .then(data => {
        setProjectIdList(data.data);
        setDataloading(false);
      });
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
                  <Grid key={value.id} item>
                    <ProjectCard project={value} projectId={value.id} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Route>
      </Switch>
      <Backdrop className={classes.backdrop} open={dataloading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
