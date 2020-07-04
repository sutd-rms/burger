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
import axios from 'axios';

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
    left: '33%',
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

class ProjectOverviewTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: this.props.projectName,
      description: this.props.projectDescription,
      cover: 'https://source.unsplash.com/random',
      titleNew: this.props.projectName,
      descriptionNew: this.props.projectDescription,
      coverNew: 'https://source.unsplash.com/random',
      editable: false,
      success: false,
      project: {}
    };

    this.onDrop = files => {
      var acceptedFiles = files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      this.setState({
        coverNew: acceptedFiles[0].preview
      });
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
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
    console.log(this.props.projectId);
    this.setState({
      editable: true
    });
  }

  handleCancel(event) {
    this.setState({
      titleNew: this.state.title,
      descriptionNew: this.state.description,
      coverNew: this.state.cover,
      editable: false
    });
  }

  handleSubmit(event) {
    //Make POST request here
    console.log(this.state.project);
    let newProject = {
      title: this.state.titleNew,
      description: this.state.descriptionNew
      // cover: this.state.project.cover,
      // company: this.state.project.company,
      // owners: this.state.project.owners,
      // id: this.props.projectId,
      // constraint_blocks: this.state.project.constraint_blocks,
      // data_blocks: this.state.project.data_blocks,
    };
    console.log(newProject);
    const id = this.props.projectId;
    // FETCH & SET STATE
    let token = localStorage.getItem('token');
    axios
      .patch(
        `https://secret-sauce.azurewebsites.net/portal/projects/${id}`,
        newProject,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`
          }
        }
      )
      .then(res =>
        this.setState({
          title: this.state.titleNew,
          description: this.state.descriptionNew,
          cover: this.state.coverNew,
          editable: false,
          success: true
        })
      );
  }

  handleCloseSnackbar(event) {
    this.setState({
      success: false
    });
  }

  componentDidMount() {
    const id = this.props.projectId;
    // FETCH & SET STATE
    let token = localStorage.getItem('token');
    axios
      .get(`https://secret-sauce.azurewebsites.net/portal/projects/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(data =>
        this.setState({
          id: id,
          titleNew: data.data.title,
          descriptionNew: data.data.description,
          title: data.data.title,
          description: data.data.description,
          project: data.data
        })
      );
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
                            ? this.state.coverNew
                            : this.state.cover
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
            <Button
              variant="outlined"
              size="small"
              disabled={this.state.editable ? true : false}
              onClick={this.handleEdit}
            >
              Edit Project
            </Button>
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
                  Title
                </InputLabel>
                <FormInput
                  id="title-input"
                  disabled={this.state.editable ? false : true}
                  className={
                    this.state.editable ? classes.enabled : classes.disabled
                  }
                  name={this.state.editable ? 'titleNew' : 'title'}
                  value={
                    this.state.editable ? this.state.titleNew : this.state.title
                  }
                  onChange={this.handleInputChange}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.root}>
                <InputLabel
                  shrink
                  htmlFor="description-desc"
                  className={classes.label}
                >
                  Description
                </InputLabel>
                <FormInput
                  multiline
                  rows="8"
                  id="description-input"
                  disabled={this.state.editable ? false : true}
                  className={
                    this.state.editable ? classes.enabled : classes.disabled
                  }
                  name={this.state.editable ? 'descriptionNew' : 'description'}
                  value={
                    this.state.editable
                      ? this.state.descriptionNew
                      : this.state.description
                  }
                  onChange={this.handleInputChange}
                />
              </FormControl>
            </div>
          </Grid>
        </Grid>
        <Snackbar
          open={this.state.success}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity="success">
            Project Edited!
          </Alert>
        </Snackbar>
      </Box>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ProjectOverviewTab);
