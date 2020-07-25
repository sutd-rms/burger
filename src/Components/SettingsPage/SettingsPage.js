import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DashboardTopNav from './../DashboardTopNav';
import ProfileForm from './ProfileForm';
import ConstraintCategoryTable from './ConstraintCategoryTable';
import { store } from './../../redux/store';

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
      id: id,
      is_staff: store.getState().currentUser.is_staff
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <DashboardTopNav title="general settings" />
        <ProfileForm />
        <Box mt={5}>
          {this.state.is_staff ? <ConstraintCategoryTable /> : null}
        </Box>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SettingsPage);
