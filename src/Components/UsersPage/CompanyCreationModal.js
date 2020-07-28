import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { Box, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'flex',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CompanyCreationModal(props) {
  const token = localStorage.getItem('token');
  const classes = useStyles();
  // const [newEmail, setNewEmail] = useState('');
  const [name, setName] = useState('');
  // const [companyList, setCompanyList] = useState([]);
  const [emptyField, setEmptyField] = useState(false);
  const [error, setError] = useState('');
  const [creationError, setCreationError] = useState(false);

  const handleChange = event => {
    setName(event.target.value);
  };

  // const handleCompanyChange = opt => {
  //   if (opt) {
  //     setNewCompany(opt.id);
  //   } else {
  //     setNewCompany('');
  //   }
  // };

  const onClick = () => {
    if (name) {
      let newCompany = {
        name: name
      };
      axios
        .post(
          'https://secret-sauce.azurewebsites.net/auth/company/',
          newCompany,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Token ${token}`
            }
          }
        )
        .then(res => {
          if (res.status === 201) {
            props.setSuccess(true);
            window.location.reload();
          }
        })
        .catch(err => {
          let errorString = '';
          for (var item in err.response.data) {
            errorString = errorString + err.response.data[item] + '\n ';
          }
          setError(errorString);
          console.log(errorString);
          setCreationError(true);
        });
    } else {
      setEmptyField(true);
    }
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Create Company</h2>
      <p id="simple-modal-description">
        Provide a company name to create new company.
      </p>
      <Box mx="auto" p={2}>
        <TextField
          id="standard-basic"
          label="New Company Name"
          onChange={handleChange}
          value={name}
          fullWidth
        />
      </Box>
      <Box mx="auto" p={2}>
        <Button onClick={onClick} fullWidth>
          Create
        </Button>
      </Box>
    </div>
  );

  const handleCloseSnackbar = () => {
    setEmptyField(false);
    setCreationError(false);
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Snackbar
        open={emptyField}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Company of Email could not be empty!
        </Alert>
      </Snackbar>
      <Snackbar
        open={creationError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
