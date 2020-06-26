import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import RmsLogo from '../static/images/rms_logo.jpg';

// import { useForm } from "react-hook-form";

const styles = theme => ({
  logo: {
    width: 400,
    marginLeft: 100
  },

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

class PasswordResetConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleInputChange = this.handleInputChange.bind(this);
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
                PASSWORD RESET
              </Typography>
            </Box>
            <form onSubmit={this.handleSubmit}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                Please enter your email address
              </Typography>
              <TextField
                variant="outlined"
                required
                type="email"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
                autoFocus
              />
              <Box mt={3}>
                <Button
                  className={classes.submit}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
          <CardMedia
            component="img"
            title="rms logo"
            image={RmsLogo}
            className={classes.logo}
          />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PasswordResetConfirm);
