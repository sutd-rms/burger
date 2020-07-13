import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Dropzone from 'react-dropzone';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ChangePasswordModal from './ChangePasswordModal';

const styles = theme => ({
  root: {
    width: '90%'
  },

  disabled: {
    color: 'rgba(0, 0, 0, 0.87) !important'
  },

  enabled: {
    color: '#B4B5B7'
  },

  media: {
    height: 200,
    width: 200,
    margin: 'auto',
    marginBottom: 20
  },

  mediaEditable: {
    height: 200,
    width: 200,
    margin: 'auto',
    marginBottom: 20,
    opacity: 0.5,
    filter: 'brightness(50%)'
  },

  label: {
    color: 'black'
  },

  profilebar: {
    textAlign: 'center'
  },

  checkIcon: {
    color: 'green',
    marginRight: 10
  },

  cancelIcon: {
    color: 'red',
    marginLeft: 10
  },
  card: {
    position: 'relative'
  },
  overlayEditable: {
    position: 'absolute',
    top: '33%',
    left: '35%',
    color: 'white'
  },
  hidden: {
    display: 'none'
  },
  photoIcon: {
    width: '50px',
    height: '50px'
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: 'mengsiong@rms.com',
      organisation: "McDonald's Australia",
      firstName: 'Meng',
      lastName: 'Siong',
      phone: '81234567',
      profile: 'https://source.unsplash.com/random',
      firstNameNew: 'Meng',
      lastNameNew: 'Siong',
      phoneNew: '81234567',
      profileNew: 'https://source.unsplash.com/random',
      editable: false,
      profileSuccess: false,
      passwordSuccess: false
    };

    this.onDrop = files => {
      var acceptedFiles = files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      this.setState({
        profileNew: acceptedFiles[0].preview
      });
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseProfileSnackbar = this.handleCloseProfileSnackbar.bind(
      this
    );
    this.handleClosePasswordSnackbar = this.handleClosePasswordSnackbar.bind(
      this
    );
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.showPasswordAlert = this.showPasswordAlert.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleEdit(event) {
    this.setState({
      editable: true
    });
  }

  handleCancel(event) {
    this.setState({
      firstNameNew: this.state.firstName,
      lastNameNew: this.state.lastName,
      profileNew: this.state.profile,
      phoneNew: this.state.phone,
      editable: false
    });
  }

  handleSubmit(event) {
    //Make POST request here

    this.setState({
      firstName: this.state.firstNameNew,
      lastName: this.state.lastNameNew,
      profile: this.state.profileNew,
      phone: this.state.phoneNew,
      editable: false,
      profileSuccess: true,
      open: false
    });
  }

  handleCloseProfileSnackbar(event) {
    this.setState({
      profileSuccess: false
    });
  }

  handleClosePasswordSnackbar(event) {
    this.setState({
      passwordSuccess: false
    });
  }

  handleOpenModal(event) {
    this.setState({
      open: true
    });
  }

  handleCloseModal(event) {
    this.setState({
      open: false
    });
  }

  showPasswordAlert(event) {
    //Make POST request here

    this.setState({
      passwordSuccess: true
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Box boxShadow={3} px={5} py={5}>
        <Grid container spacing={3}>
          <Grid item md={3} className={classes.profilebar}>
            <Dropzone
              onDrop={this.onDrop}
              disabled={!this.state.editable}
              multiple={false}
              accept="image/jpeg, image/png, image/jpg"
            >
              {({ getRootProps, getInputProps }) => (
                <section
                  className="container"
                  className={classes.dropContainer}
                >
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <div className={classes.card}>
                      <Avatar
                        alt="Profile Picture"
                        src={
                          this.state.editable
                            ? this.state.profileNew
                            : this.state.profile
                        }
                        className={
                          this.state.editable
                            ? classes.mediaEditable
                            : classes.media
                        }
                      />
                      <div
                        className={
                          this.state.editable
                            ? classes.overlayEditable
                            : classes.hidden
                        }
                      >
                        <PhotoCameraIcon
                          className={
                            this.state.editable ? classes.photoIcon : ''
                          }
                        />
                        <div>Change Image</div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
            <Box mt={5}>
              <Button
                variant="outlined"
                size="small"
                disabled={this.state.editable ? true : false}
                onClick={this.handleOpenModal}
              >
                Change Password
              </Button>
            </Box>
            <Box mt={2}>
              <Button
                variant="outlined"
                size="small"
                disabled={this.state.editable ? true : false}
                onClick={this.handleEdit}
              >
                Edit Profile
              </Button>
            </Box>
            <Box mt={1} visibility={this.state.editable ? 'visible' : 'hidden'}>
              <CheckCircleIcon
                className={classes.checkIcon}
                onClick={this.handleSubmit}
              />
              <CancelIcon
                className={classes.cancelIcon}
                onClick={this.handleCancel}
              />
            </Box>
          </Grid>
          <Grid item md={9}>
            <div>
              <FormControl className={classes.root}>
                <InputLabel
                  shrink
                  htmlFor="title-input"
                  className={classes.label}
                >
                  Email
                </InputLabel>
                <FormInput
                  id="title-input"
                  disabled={true}
                  className={classes.disabled}
                  name="email"
                  value={this.state.email}
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
                  Organisation
                </InputLabel>
                <FormInput
                  id="title-input"
                  disabled={true}
                  className={classes.disabled}
                  name="organisation"
                  value={this.state.organisation}
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
                  First Name
                </InputLabel>
                <FormInput
                  id="title-input"
                  disabled={this.state.editable ? false : true}
                  className={
                    this.state.editable ? classes.enabled : classes.disabled
                  }
                  name={this.state.editable ? 'firstNameNew' : 'firstName'}
                  value={
                    this.state.editable
                      ? this.state.firstNameNew
                      : this.state.firstName
                  }
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
                  Last Name
                </InputLabel>
                <FormInput
                  id="title-input"
                  disabled={this.state.editable ? false : true}
                  className={
                    this.state.editable ? classes.enabled : classes.disabled
                  }
                  name={this.state.editable ? 'lastNameNew' : 'lastName'}
                  value={
                    this.state.editable
                      ? this.state.lastNameNew
                      : this.state.lastName
                  }
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
                  Phone Number
                </InputLabel>
                <FormInput
                  id="title-input"
                  type="number"
                  disabled={this.state.editable ? false : true}
                  className={
                    this.state.editable ? classes.enabled : classes.disabled
                  }
                  name={this.state.editable ? 'phoneNew' : 'phone'}
                  value={
                    this.state.editable ? this.state.phoneNew : this.state.phone
                  }
                  onChange={this.handleInputChange}
                />
              </FormControl>
            </div>
          </Grid>
        </Grid>
        <Snackbar
          open={this.state.profileSuccess}
          autoHideDuration={6000}
          onClose={this.handleCloseProfileSnackbar}
        >
          <Alert onClose={this.handleCloseProfileSnackbar} severity="success">
            Profile Edited!
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.passwordSuccess}
          autoHideDuration={6000}
          onClose={this.handleClosePasswordSnackbar}
        >
          <Alert onClose={this.handleClosePasswordSnackbar} severity="success">
            Password Changed!
          </Alert>
        </Snackbar>
        <ChangePasswordModal
          open={this.state.open}
          handleClose={this.handleCloseModal}
          showAlert={this.showPasswordAlert}
        />
      </Box>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ProfileForm);