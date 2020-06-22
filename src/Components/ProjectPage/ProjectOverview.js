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

const styles = theme => ({
  root: {
    width: '90%'
  },

  disabled: {
    color: 'rgba(0, 0, 0, 0.87) !important'
  },

  media: {
    height: 200,
    width: 200,
    margin: 'auto'
  },

  label: {
    color: 'black'
  }
});

const FormInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },

  input: {
    color: 'black',
    position: 'relative',
    backgroundColor: theme.palette.common.white,
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
      description: 'This is a sample description!',
      cover: 'https://source.unsplash.com/random',
      editable: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Box boxShadow={3} px={5} py={5}>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <Avatar
              alt="Remy Sharp"
              src={this.state.cover}
              className={classes.media}
            />
            <Button color="primary">Edit Project</Button>
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
                  disabled="true"
                  className={classes.disabled}
                  name="title"
                  value={this.state.title}
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
                  rows="6"
                  id="bootstrap-input"
                  disabled="true"
                  className={classes.disabled}
                  name="description"
                  value={this.state.description}
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
