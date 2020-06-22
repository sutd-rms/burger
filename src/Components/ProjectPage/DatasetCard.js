import React, { useState, useDebugValue } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import CardContent from '@material-ui/core/CardContent';
import InputBase from '@material-ui/core/InputBase';
import { TextField, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 175,
    maxHeight: 175,
    justifyContent: 'center'
  },
  disabled: {
    color: 'rgba(0, 0, 0, 0.87) !important'
  },

  enabled: {
    color: '#B4B5B7'
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '11fr 1fr',
    gridGap: theme.spacing(3)
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DatasetCard(props) {
  const classes = useStyles();
  const [id, setId] = useState(props.dataset.id);
  const [name, setName] = useState(props.dataset.name);
  const [description, setDescription] = useState(props.dataset.description);
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    if (edit) {
      //   save and update database
      setEdit(false);
      setSuccess(true);
    } else {
      setEdit(true);
    }
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handelDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Grid containter direction="row" className={classes.container}>
            <Grid item xs={9}>
              <Box>
                <Typography variant="h6">Dataset ID: {id}</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Button variant="outlined" onClick={handleClick} fullWidth>
                  {edit ? 'Save' : 'Edit'}
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box m={2}>
            <Typography variant="subtitle1">Dataset Name</Typography>
            <TextField
              id="name"
              variant="outlined"
              disabled={!edit}
              name={name}
              value={name}
              fullWidth
              onChange={handleNameChange}
            />
          </Box>

          <Box m={2}>
            <Typography variant="subtitle1">Dataset Description</Typography>
            <TextField
              id="description"
              variant="outlined"
              disabled={!edit}
              rowsMax={4}
              fullWidth
              name={description}
              value={description}
              onChange={handelDescriptionChange}
            />
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Information Edited for Dataset: {id}!
        </Alert>
      </Snackbar>
    </div>
  );
}
