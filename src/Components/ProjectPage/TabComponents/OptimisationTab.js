import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Typography } from '@material-ui/core';
import OptimisationTable from './OptimisationTable';
import ConstraintsTable from './ConstraintsTable';
import OptimisationModal from './OptimisationModal';
import ConstraintModal from './ConstraintModal';
import { store } from '../../../redux/store';

const styles = theme => ({
  root: {},
  constraintButton: {
    marginLeft: 15
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class OptimisationTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openOptimisation: false,
      openConstraint: false,
      optimisationSuccess: false,
      constraintSuccess: false,
      is_staff: store.getState().currentUser.is_staff
    };

    this.handleOpenOptimisationModal = this.handleOpenOptimisationModal.bind(
      this
    );
    this.handleCloseOptimisationModal = this.handleCloseOptimisationModal.bind(
      this
    );
    this.handleOpenConstraintModal = this.handleOpenConstraintModal.bind(this);
    this.handleCloseConstraintModal = this.handleCloseConstraintModal.bind(
      this
    );
    this.showOptimisationAlert = this.showOptimisationAlert.bind(this);
    this.showConstraintAlert = this.showConstraintAlert.bind(this);
    this.handleCloseOptimisationSnackbar = this.handleCloseOptimisationSnackbar.bind(
      this
    );
    this.handleCloseConstraintSnackbar = this.handleCloseConstraintSnackbar.bind(
      this
    );
  }

  handleOpenOptimisationModal(event) {
    this.setState({
      openOptimisation: true
    });
  }

  handleCloseOptimisationModal(event) {
    this.setState({
      openOptimisation: false
    });
  }

  handleOpenConstraintModal(event) {
    this.setState({
      openConstraint: true
    });
  }

  handleCloseConstraintModal(event) {
    this.setState({
      openConstraint: false
    });
  }

  showOptimisationAlert(event) {
    //Make POST request here

    this.setState({
      optimisationSuccess: true
    });
  }

  showConstraintAlert(event) {
    //Make POST request here

    this.setState({
      constraintSuccess: true
    });
  }

  handleCloseOptimisationSnackbar(event) {
    this.setState({
      optimisationSuccess: false
    });
  }

  handleCloseConstraintSnackbar(event) {
    this.setState({
      constraintSuccess: false
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Box>
        <Box
          mb={5}
          px={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h6" component="h2">
              Optimisation
            </Typography>
            <Typography variant="subtitle1">
              {this.state.is_staff
                ? 'Create constraints or run optimisations to power up your pricing analytics'
                : 'Create constraints or view the optimisations results to power up your pricing analytics'}
            </Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              onClick={this.handleOpenOptimisationModal}
              hidden={!this.state.is_staff}
            >
              Run Optimisation
            </Button>
            <Button
              variant="outlined"
              className={classes.constraintButton}
              onClick={this.handleOpenConstraintModal}
            >
              Create Constraint Set
            </Button>
          </Box>
        </Box>
        <OptimisationTable />
        <Box mt={5}>
          <ConstraintsTable projectId={this.props.projectId} />
        </Box>
        <Snackbar
          open={this.state.optimisationSuccess}
          autoHideDuration={6000}
          onClose={this.handleCloseOptimisationSnackbar}
        >
          <Alert
            onClose={this.handleCloseOptimisationSnackbar}
            severity="success"
          >
            Optimisation has started! Please check again later!
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.constraintSuccess}
          autoHideDuration={6000}
          onClose={this.handleCloseConstraintSnackbar}
        >
          <Alert
            onClose={this.handleCloseConstraintSnackbar}
            severity="success"
          >
            Constraint Set has been added!
          </Alert>
        </Snackbar>
        <OptimisationModal
          open={this.state.openOptimisation}
          handleClose={this.handleCloseOptimisationModal}
          showAlert={this.showOptimisationAlert}
        />
        <ConstraintModal
          open={this.state.openConstraint}
          handleClose={this.handleCloseConstraintModal}
          showAlert={this.showConstraintAlert}
          projectId={this.props.projectId}
        />
      </Box>
    );
  }
}

export default withStyles(styles, { withTheme: true })(OptimisationTab);
