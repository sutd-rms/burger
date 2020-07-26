import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DashboardTopNav from './../DashboardTopNav';
import ConstraintSetDetailsTable from './ConstraintSetDetailsTable';
import AddConstraintModal from './AddConstraintModal';
import axios from 'axios';

const styles = theme => ({
  root: {},
  addButton: {
    height: '36px'
  }
});

const token = localStorage.getItem('token');

class ConstraintSetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      open: false
    };
    this.handleOpenAddConstraintModal = this.handleOpenAddConstraintModal.bind(
      this
    );
    this.handleCloseAddConstraintModal = this.handleCloseAddConstraintModal.bind(
      this
    );
  }

  handleOpenAddConstraintModal(event) {
    this.setState({
      open: true
    });
  }

  handleCloseAddConstraintModal(event) {
    this.setState({
      open: false
    });
  }

  componentDidMount() {
    axios
      .get(
        `https://secret-sauce.azurewebsites.net/portal/constraintsets/${this.props.match.params.constraintsetId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`
          }
        }
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          title: res.data.name
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <DashboardTopNav title={this.state.title} />
          <Button
            variant="outlined"
            onClick={this.handleOpenAddConstraintModal}
            className={classes.addButton}
          >
            Add Constraint
          </Button>
        </Box>
        <ConstraintSetDetailsTable
          constraintSetID={this.props.match.params.constraintsetId}
        />
        <AddConstraintModal
          open={this.state.open}
          handleClose={this.handleCloseAddConstraintModal}
          constraintSetID={this.props.match.params.constraintsetId}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ConstraintSetPage);
