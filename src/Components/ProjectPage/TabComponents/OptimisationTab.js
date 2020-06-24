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
      open: false,
      success: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
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
            <Button variant="outlined" onClick={this.handleOpenModal}>
              Run Optimisation
            </Button>
            <Button
              variant="outlined"
              className={classes.constraintButton}
              onClick={this.handleOpenModal}
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
          open={this.state.open}
          handleClose={this.handleCloseModal}
          showAlert={this.showAlert}
        />
      </Box>
    );
  }
}

export default withStyles(styles, { withTheme: true })(OptimisationTab);
