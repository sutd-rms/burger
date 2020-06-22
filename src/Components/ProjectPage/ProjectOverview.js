import React from 'react';
import PropTypes from 'prop-types';
import { fade, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Dropzone from 'react-dropzone';

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

class ProjectOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: "McDonald's Australia",
      description: 'This is a sample description!',
      cover: 'https://source.unsplash.com/random',
      titleNew: "McDonald's Australia",
      descriptionNew: 'This is a sample description!',
      coverNew: 'https://source.unsplash.com/random',
      editable: false
    };

    this.onDrop = files => {
      this.setState({
        coverNew: files
      });
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      titleNew: this.state.title,
      descriptionNew: this.state.description,
      coverNew: this.state.cover,
      editable: false
    });
  }

  handleSubmit(event) {
    //Make POST request here

    this.setState({
      title: this.state.titleNew,
      description: this.state.descriptionNew,
      cover: this.state.coverNew,
      editable: false
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
              disabled={this.state.disableUpload}
              multiple={false}
              accept=".csv"
            >
              {({ getRootProps, getInputProps }) => (
                <section
                  className="container"
                  className={classes.dropContainer}
                >
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <Avatar
                      alt="Remy Sharp"
                      src={this.state.cover}
                      className={classes.media}
                    />
                  </div>
                </section>
              )}
            </Dropzone>
            {/* <Avatar
              alt="Remy Sharp"
              src={this.state.cover}
              className={classes.media}
            /> */}
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
                  htmlFor="bootstrap-input"
                  className={classes.label}
                >
                  Title
                </InputLabel>
                <FormInput
                  id="bootstrap-input"
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
                  htmlFor="bootstrap-desc"
                  className={classes.label}
                >
                  Description
                </InputLabel>
                <FormInput
                  multiline
                  rows="8"
                  id="bootstrap-input"
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
      </Box>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ProjectOverview);
