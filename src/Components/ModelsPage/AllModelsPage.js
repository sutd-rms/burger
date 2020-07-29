import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ModelCard from './ModelCard';
import FloatingAddButton from '../FloatingAddButton';
import ModelCreationForm from './ModelCreationForm';
import DashboardTopNav from './../DashboardTopNav';
import axios from 'axios';

// function Model() {
//   let { modelId } = useParams();
//   return <h3>Requested model ID: {modelId}</h3>;
// }

export default function AllModelsPage() {
  const [modelsList, setModelsList] = useState([]);
  const [displayCreationForm, setDisplayCreationForm] = useState(false);
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
      .get('https://secret-sauce.azurewebsites.net/portal/predictionmodels/', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(data => {
        setModelsList(data.data);
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
    </div>
  );
}
