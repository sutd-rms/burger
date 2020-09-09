import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ModelCard from './ModelCard';
import FloatingAddButton from '../FloatingAddButton';
import ModelCreationForm from './ModelCreationForm';
import DashboardTopNav from './../DashboardTopNav';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

export default function AllModelsPage() {
  const classes = useStyles();

  const [modelsList, setModelsList] = useState([]);
  const [displayCreationForm, setDisplayCreationForm] = useState(false);
  const [dataloading, setDataloading] = useState(true);
  let match = useRouteMatch();

  const handleOpen = () => {
    setDisplayCreationForm(true);
  };

  const handleClose = () => {
    setDisplayCreationForm(false);
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    axios
      .get('http://localhost:8000/portal/predictionmodels/', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(data => {
        setModelsList(data.data);
        setDataloading(false);
      });
  }, []);

  return (
    <div>
      <Switch>
        {/* <Route path={`${match.path}/:modelId`}>
          <Model />
        </Route> */}
        <Route path={match.path}>
          <DashboardTopNav title="models" />
          <FloatingAddButton onClick={handleOpen} />
          <ModelCreationForm
            open={displayCreationForm}
            handleClose={handleClose}
          />
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Grid container justify="flex-start" spacing={7}>
                {modelsList.map(value => (
                  <Grid key={value.id} item>
                    <ModelCard model={value} />
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
