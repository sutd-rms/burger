import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { store } from '../../redux/store';

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

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: 2000,
    color: '#fff'
  }
}));

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ProjectCreationForm(props) {
  const classes = useStyles();

  let userCompany = store.getState().currentUser.company;
  let userIsStaff = store.getState().currentUser.is_staff;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [organization, setOrganization] = useState('');
  const [organizationList, setOrganizationList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [displayCompany, setDisplayCompany] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const onFormSubmission = e => {
    e.preventDefault();
    setLoading(true);
    // ADD API CALL HERE
    if (name === '' || organization === '') {
      setEmpty(true);
    } else {
      let uid = store.getState().currentUser.id;
      let newProject = {
        title: name,
        description: description,
        company: organization,
        owners: [uid]
      };
      let token = localStorage.getItem('token');
      axios
        .post(
          `https://secret-sauce.azurewebsites.net/portal/projects/`,
          newProject,
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
            setLoading(false);
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
          setLoading(false);
          setFail(true);
        });
    }
  };

  useEffect(() => {
    if (userIsStaff) {
      setDisplayCompany(true);
      let token = localStorage.getItem('token');
      axios
        .get('https://secret-sauce.azurewebsites.net/auth/company/', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`
          }
        })
        .then(res => {
          setOrganizationList(res.data);
        });
    } else {
      setOrganization(userCompany);
    }
  }, [userCompany, userIsStaff]);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleOrganizationChange = e => {
    console.log(e.target.value);
    setOrganization(e.target.value);
  };

  const handleCloseSnackbar = e => {
    setSuccess(false);
    setFail(false);
    setEmpty(false);
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Create New Project
        </DialogTitle>
        <DialogContent dividers>
          <form noValidate onSubmit={onFormSubmission}>
            <Typography variant="subtitle2" gutterBottom>
              Project Name
            </Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="projectName"
              name="Project Name"
              value={name}
              onChange={handleNameChange}
              autoFocus
            />
            <Typography variant="subtitle2" gutterBottom>
              Project Description
            </Typography>
            <TextField
              variant="outlined"
              required
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={handleDescriptionChange}
              name="description"
              id="description"
            />
            {displayCompany ? (
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Client Organization
                </Typography>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  fullWidth
                  value={organization}
                  onChange={handleOrganizationChange}
                >
                  {organizationList.map(value => (
                    <MenuItem value={value.id} id={value.id} key={value.id}>
                      {value.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            ) : (
              ''
            )}

            <Box m={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                mt={1}
              >
                Create
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          New project created!
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
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
