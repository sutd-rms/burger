import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import DashboardTopNav from './../DashboardTopNav';
import ProfileForm from './ProfileForm';

const styles = theme => ({
  root: {}
});

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ''
    };
  }

  componentDidMount() {
    const id = this.props.match.params.projectId;
    // FETCH & SET STATE
    this.setState({
      id: id
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <DashboardTopNav title="general settings" />
        <ProfileForm />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SettingsPage);
