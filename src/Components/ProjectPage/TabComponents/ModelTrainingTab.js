import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Typography } from '@material-ui/core';
import TrainedModelsTable from './TrainedModelsTable';
import TrainModelModal from './TrainModelModal';
import { store } from '../../../redux/store';

const styles = theme => ({
  root: {}
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class ModelTrainingTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      success: false,
      is_staff: store.getState().currentUser.is_staff
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
        <Box mb={5} px={1} display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="h6" component="h2">
              Model Training
            </Typography>
            <Typography variant="subtitle1">
              {this.state.is_staff
                ? 'Use your datasets and start training models now!'
                : 'You can view the models that are trained on the uploaded datasets!'}
            </Typography>
          </Box>
          <Button variant="outlined" onClick={this.handleOpenModal} hidden={!this.state.is_staff}>
            Train New Model
          </Button>
        </Box>
        <TrainedModelsTable />
        <Snackbar
          open={this.state.success}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity="success">
            Model training has started! Please check again later!
          </Alert>
        </Snackbar>
        <TrainModelModal
          open={this.state.open}
          handleClose={this.handleCloseModal}
          showAlert={this.showAlert}
        />
      </Box>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ModelTrainingTab);
