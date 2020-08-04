import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(8, 15)
  },
  root: {
    width: '300px',
    marginTop: theme.spacing(2)
  },
  submitButton: {
    backgroundColor: 'green',
    color: 'white'
  },
  backdrop: {
    zIndex: 2000,
    color: '#fff'
  }
});

const FormInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },

  input: {
    position: 'relative',
    border: '1px solid #ced4da',
    width: '100%',
    padding: '10px 12px',
    marginBottom: '20px',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  }
}))(InputBase);

const ErrorList = ({ list }) => (
  <ul>
    {list.map(item => (
      <li style={{ color: 'white', width: '240px' }} key={item}>
        {item}
      </li>
    ))}
  </ul>
);

class ChangePasswordModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      reNewPassword: '',
      errorMessage: [],
      error: false,
      loading: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleReset(event) {
    this.setState({
      currentPassword: '',
      newPassword: '',
      reNewPassword: '',
      errorMessage: []
    });
  }

  closeModal(event) {
    this.handleReset();
    this.props.handleClose();
  }

  handleSubmit(event) {
    //Make POST request here
    this.setState({ loading: true });
    let token = localStorage.getItem('token');
    const form = {
      new_password: this.state.newPassword,
      re_new_password: this.state.reNewPassword,
      current_password: this.state.currentPassword
    };

    axios
      .post(
        `https://secret-sauce.azurewebsites.net/auth/users/set_password/`,
        form,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`
          }
        }
      )
      .then(res => {
        if (res.status === 204) {
          this.setState({ loading: false });
          this.props.showAlert();
          this.closeModal();
        }
      })
      .catch(err => {
        console.log(err.response.data);
        let errorList = [];
        for (var item in err.response.data) {
          if (item !== 'status_code') {
            errorList = [...errorList, ...err.response.data[item]];
          }
        }
        this.setState({
          currentPassword: '',
          newPassword: '',
          reNewPassword: '',
          loading: false
        });
        this.props.resetFail(errorList);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <React.Fragment>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={this.props.open}
            onClose={this.closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={this.props.open}>
              <div className={classes.paper}>
                <Typography variant="h5" className={classes.title}>
                  Change Password
                </Typography>
                <Box mt={2}>
                  <ErrorList list={this.state.errorMessage} />
                </Box>
                <div className={classes.root}>
                  <div>
                    <FormControl className={classes.root}>
                      <InputLabel
                        shrink
                        htmlFor="title-input"
                        className={classes.label}
                      >
                        Current Password
                      </InputLabel>
                      <FormInput
                        name="currentPassword"
                        type="password"
                        value={this.state.currentPassword}
                        onChange={this.handleInputChange}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.root}>
                      <InputLabel
                        shrink
                        htmlFor="title-input"
                        className={classes.label}
                      >
                        New Password
                      </InputLabel>
                      <FormInput
                        name="newPassword"
                        type="password"
                        value={this.state.newPassword}
                        onChange={this.handleInputChange}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.root}>
                      <InputLabel
                        shrink
                        htmlFor="title-input"
                        className={classes.label}
                      >
                        Confirm New Password
                      </InputLabel>
                      <FormInput
                        name="reNewPassword"
                        type="password"
                        value={this.state.reNewPassword}
                        onChange={this.handleInputChange}
                      />
                    </FormControl>
                  </div>
                  <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      className={classes.submitButton}
                      onClick={this.handleSubmit}
                    >
                      SUBMIT
                    </Button>
                  </Box>
                </div>
              </div>
            </Fade>
          </Modal>
        </React.Fragment>
        <Backdrop className={classes.backdrop} open={this.state.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ChangePasswordModal);
