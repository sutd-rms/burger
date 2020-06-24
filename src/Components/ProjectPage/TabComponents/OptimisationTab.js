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
      success: false
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

    this.showAlert = this.showAlert.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
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

  showAlert(event) {
    //Make POST request here

    this.setState({
      success: true
    });
  }

  handleCloseSnackbar(event) {
    this.setState({
      success: false
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
              Create constraints or run optimisations to power up your pricing
              analytics
            </Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              onClick={this.handleOpenOptimisationModal}
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
          <ConstraintsTable />
        </Box>
        <Snackbar
          open={this.state.success}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity="success">
            Optimisation has started! Please check again later!
          </Alert>
        </Snackbar>
        <OptimisationModal
          open={this.state.openOptimisation}
          handleClose={this.handleCloseOptimisationModal}
          showAlert={this.showAlert}
        />
        <ConstraintModal
          open={this.state.openConstraint}
          handleClose={this.handleCloseConstraintModal}
          showAlert={this.showAlert}
        />
      </Box>
    );
  }
}

export default withStyles(styles, { withTheme: true })(OptimisationTab);
