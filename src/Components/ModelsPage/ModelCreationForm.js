import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

export default function ModelCreationForm(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // const [company, setCompany] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [empty, setEmpty] = useState(false);

  const onFormSubmission = e => {
    e.preventDefault();
    if (name === '' || description === '') {
      setEmpty(true);
    } else {
      // ADD API CALL HERE
      let newModel = {
        name: name,
        description: description
      };
      let token = localStorage.getItem('token');
      axios
        .post(
          `https://secret-sauce.azurewebsites.net/portal/predictionmodels/`,
          newModel,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Token ${token}`
            }
          }
        )
        .then(res => {
          if ((res.status = 200)) {
            setSuccess(true);
            props.handleClose();
            window.location.reload();
          } else {
            setFail(true);
          }
        })
        .catch(err => {
          let errMsg = '';
          for (var item in err.response.data) {
            if (item !== 'status') {
              errMsg = errMsg + err.response.data[item][0];
            }
          }
          setErrorMsg(errMsg);
          setFail(true);
        });
    }
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleCloseSnackbar = e => {
    setSuccess(false);
    setFail(false);
    setEmpty(false);
    setErrorMsg('');
  };

  return (
    <div>
      <Dialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Create New Model
        </DialogTitle>
        <DialogContent dividers>
          <form noValidate onSubmit={onFormSubmission}>
            <Typography gutterBottom>
              Create new prediction models here. Fill up the model name and
              description to create new model.
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="modelName"
              label="Model Name"
              name="Model Name"
              value={name}
              onChange={handleNameChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={handleDescriptionChange}
              name="description"
              label="Model Description"
              id="description"
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          New Model created!
        </Alert>
      </Snackbar>
      <Snackbar
        open={fail}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={empty}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Please fill up the fields required!
        </Alert>
      </Snackbar>
    </div>
  );
}
