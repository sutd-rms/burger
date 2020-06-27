import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// import { useForm } from "react-hook-form";

const styles = theme => ({
  top: {
    paddingBottom: 10,
    borderBottom: '2px solid #C4C4C4'
  },

  error: {
    color: 'red'
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

class PasswordResetConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(name);
    console.log(value);

    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      success: true
    });
    this.setState({
      error: 'Passwords do not match!'
    });
  };

  handleCloseSnackbar = event => {
    event.preventDefault();
    this.setState({
      success: false
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
              <Box mt={5}>
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                    className={classes.error}
                  >
                    {this.state.error}
                  </Typography>
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
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PasswordResetConfirm);
