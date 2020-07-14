import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DashboardTopNav from './../DashboardTopNav';
import ConstraintSetDetailsTable from './ConstraintSetDetailsTable';
import AddConstraintModal from './AddConstraintModal';

const styles = theme => ({
  root: {},
  addButton: {
    height: '36px'
  }
});

class ConstraintSetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: 'Constraint Set ' + this.props.match.params.constraintsetId,
      open: false
    };
    this.handleOpenAddConstraintModal = this.handleOpenAddConstraintModal.bind(
      this
    );
    this.handleCloseAddConstraintModal = this.handleCloseAddConstraintModal.bind(
      this
    );
  }

  componentDidMount() {}

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
        <ConstraintSetDetailsTable />
        <AddConstraintModal
          open={this.state.open}
          handleClose={this.handleCloseAddConstraintModal}
          showAlert={this.showConstraintAlert}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ConstraintSetPage);
