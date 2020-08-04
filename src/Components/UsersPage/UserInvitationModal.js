import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { Box, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  },
  backdrop: {
    zIndex: 2000,
    color: '#fff'
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AutoCompleteField(props) {
  const [inputValue, setInputValue] = useState(props.value);

  let onInputChange = (evt, newInput) => {
    setInputValue(newInput);
  };

  let onChange = (evt, newValue) => {
    props.onChange(newValue);
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      onChange={onChange}
      onInputChange={onInputChange}
      inputValue={inputValue}
      options={props.options}
      getOptionLabel={option => option.name}
      renderOption={option => <React.Fragment>{option.name}</React.Fragment>}
      renderInput={params => (
        <TextField
          {...params}
          label="Choose a company"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: '' // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default function UserInvitationModal(props) {
  const token = localStorage.getItem('token');
  const classes = useStyles();
  const [newEmail, setNewEmail] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [companyList, setCompanyList] = useState([]);
  const [emptyField, setEmptyField] = useState(false);
  const [error, setError] = useState('');
  const [invitationError, setInvitationError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get('https://secret-sauce.azurewebsites.net/auth/company/', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(data => setCompanyList(data.data));
  }, [token]);

  const handleChange = event => {
    setNewEmail(event.target.value);
  };

  const handleCompanyChange = opt => {
    if (opt) {
      setNewCompany(opt.id);
    } else {
      setNewCompany('');
    }
  };

  const onClick = () => {
    if (newCompany && newEmail) {
      setLoading(true);
      let userInfo = { email: newEmail, company: newCompany };
      axios
        .post(
          'https://secret-sauce.azurewebsites.net/auth/inviteuser/',
          userInfo,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Token ${token}`
            }
          }
        )
        .then(res => {
          if (res.status === 201 && res.status) {
            props.setSuccess(true);
            setLoading(false);
            props.handleClose();
          }
        })
        .catch(err => {
          let errorString = '';
          for (var item in err.response.data) {
            errorString = errorString + err.response.data[item] + '\n ';
          }
          setError(errorString);
          console.log(errorString);
          setLoading(false);
          setInvitationError(true);
        });
    } else {
      setEmptyField(true);
    }
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Invite a New User</h2>
      <p id="simple-modal-description">
        Please provide the email of the new user, an invitation with the
        registration link will be sent out
      </p>
      <Box mx="auto" p={2}>
        <TextField
          id="standard-basic"
          label="Email"
          onChange={handleChange}
          value={newEmail}
          fullWidth
        />
      </Box>
      <Box mx="auto" p={2}>
        <AutoCompleteField
          options={companyList}
          onChange={handleCompanyChange}
        />
      </Box>
      <Box mx="auto" p={2}>
        <Button onClick={onClick} fullWidth>
          Invite
        </Button>
      </Box>
    </div>
  );

  const handleCloseSnackbar = () => {
    setEmptyField(false);
    setInvitationError(false);
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
        open={invitationError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
