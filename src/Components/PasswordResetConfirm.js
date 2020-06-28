import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

const styles = theme => ({
  top: {
    paddingBottom: 10,
    borderBottom: '2px solid #C4C4C4'
  },

  submit: {
    backgroundColor: 'black',
    color: 'white',

    '&:hover': {
      backgroundColor: '#23272b',
      borderColor: '#1d2124'
    },
    '&:active': {
      backgroundColor: '#1d2124',
      borderColor: '#171a1d'
    },
    '&:focus': {
      backgroundColor: '#23272b',
      borderColor: '#1d2124',
      boxShadow: '0 0 0 0.2rem rgba(82,88,93,.5)'
    }
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ErrorList = ({ list }) => (
  <ul>
    {list.map(item => (
      <li style={{ color: 'red' }} key={item}>
        {item}
      </li>
    ))}
  </ul>
);

class PasswordResetConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: false,
      errorMessage: [],
      password: '',
      passwordConfirm: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
    this.handleCloseErrorSnackbar = this.handleCloseErrorSnackbar.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.password != this.state.passwordConfirm) {
      this.setState({
        error: true,
        errorMessage: ['Passwords given do not match!'],
        password: '',
        passwordConfirm: ''
      });
      return;
    }

    // const urlPasswordReset = `http://localhost:8000/auth/users/reset_password_confirm/`;

    const urlPasswordReset = `https://secret-sauce.azurewebsites.net/auth/users/reset_password_confirm/`;

    const form = {
      uid: this.props.match.params.id,
      token: this.props.match.params.token,
      new_password: this.state.password,
      re_new_password: this.state.passwordConfirm
    };

    axios
      .post(urlPasswordReset, form, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      .then(res => {
        this.setState({
          success: true,
          password: '',
          passwordConfirm: '',
          error: false,
          errorMessage: []
        });
      })
      .catch(err => {
        const errorArray = err.response.data.new_password;

        this.setState({
          error: true,
          errorMessage: errorArray,
          password: '',
          passwordConfirm: ''
        });
      });
  };

  handleCloseSnackbar = event => {
    event.preventDefault();
    this.setState({
      success: false
    });
  };

  handleCloseErrorSnackbar = event => {
    event.preventDefault();
    this.setState({
      error: false
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <Box>
            <Box mb={2}>
              <Typography variant="h4" className={classes.top}>
                <b>Reset Your Password</b>
              </Typography>
            </Box>
            <form onSubmit={this.handleSubmit}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                Please enter and confirm your new password below to access your
                account
              </Typography>
              <Box mt={2}>
                <Box>
                  <ErrorList list={this.state.errorMessage} />
                </Box>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  New Password
                </Typography>
                <TextField
                  variant="outlined"
                  required
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  autoFocus
                />
              </Box>
              <Box mt={3}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  Confirm New Password
                </Typography>
                <TextField
                  variant="outlined"
                  required
                  type="password"
                  name="passwordConfirm"
                  value={this.state.passwordConfirm}
                  onChange={this.handleInputChange}
                  autoFocus
                />
              </Box>
              <Box my={3}>
                <Button
                  className={classes.submit}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  <a href="/">Return to Login Page</a>
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
        <Snackbar open={this.state.success} onClose={this.handleCloseSnackbar}>
          <Alert onClose={this.handleCloseSnackbar} severity="success">
            Password Reset!
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.error}
          onClose={this.handleCloseErrorSnackbar}
        >
          <Alert onClose={this.handleCloseErrorSnackbar} severity="error">
            An error has occured! Please try again!
          </Alert>
        </Snackbar>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PasswordResetConfirm);
