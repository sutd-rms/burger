import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import ModelCard from './ModelCard';
import FloatingAddButton from '../FloatingAddButton';
import ModelCreationForm from './ModelCreationForm';
import DashboardTopNav from './../DashboardTopNav';

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

function Model() {
  let { modelId } = useParams();
  return <h3>Requested model ID: {modelId}</h3>;
}

export default function AllModelsPage() {
  const [modelsIdList, setModelsIdList] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
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
        <Route path={`${match.path}/:modelId`}>
          <Model />
        </Route>
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
                {modelsIdList.map(value => (
                  <Grid key={value} item>
                    <ModelCard projectId={value} />
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
