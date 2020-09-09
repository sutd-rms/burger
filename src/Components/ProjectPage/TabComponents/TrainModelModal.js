import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(8, 15, 8)
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(5)
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontWeight: 'bold'
  },
  actionButtons: {
    marginTop: theme.spacing(5),
    textAlign: 'right'
  },
  submitSection: {
    marginTop: theme.spacing(5),
    textAlign: 'right'
  },
  submitButton: {
    backgroundColor: 'green',
    color: 'white'
  },
  title: {
    fontWeight: 'bold'
  }
});

function getSteps() {
  return ['Model Selection', 'Dataset Selection', 'Name Selection'];
}

const token = localStorage.getItem('token');

class TrainModelModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      modelList: [],
      model: '',
      datasetList: [],
      dataset: '',
      name: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(name);
    console.log(value);

    this.setState({
      [name]: value
    });
  }

  handleNext(event) {
    if (this.state.activeStep === 0 && this.state.model === '') {
      return;
    }

    if (this.state.activeStep === 1 && this.state.dataset === '') {
      return;
    }

    if (this.state.activeStep === 2 && this.state.name === '') {
      return;
    }

    this.setState({
      activeStep: this.state.activeStep + 1
    });
  }

  handleBack(event) {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  }

  handleReset(event) {
    this.setState({
      activeStep: 0
    });
  }

  handleSubmit(event) {
    let form = {
      prediction_model: this.state.model,
      data_block: this.state.dataset,
      name: this.state.name
    };

    axios
      .post('http://localhost:8000/portal/trainedmodels/', form, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        if (res.status === 201 && res.status) {
          this.props.handleClose();
          this.props.showAlert();
          this.handleReset();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8000/portal/predictionmodels/`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        this.setState({
          modelList: res.data
        });
        return axios.get(`http://localhost:8000/portal/datablocks/`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`
          },
          params: { project: this.props.projectId }
        });
      })
      .then(res => {
        this.setState({
          datasetList: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <Typography variant="h6" gutterBottom>
              Select a Model:
            </Typography>
            <Select
              labelId="model"
              id="model"
              key="model"
              name="model"
              fullWidth
              value={this.state.model}
              onChange={this.handleInputChange}
            >
              {this.state.modelList.map(model => (
                <MenuItem value={model.id} id={model.id} key={model.id}>
                  {model.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        );
      case 1:
        return (
          <div>
            <Typography variant="h6" gutterBottom>
              Select a Dataset to train your Model:
            </Typography>
            <Select
              labelId="dataset"
              id="dataset"
              key="dataset"
              name="dataset"
              fullWidth
              value={this.state.dataset}
              onChange={this.handleInputChange}
            >
              {this.state.datasetList.map(dataset => (
                <MenuItem value={dataset.id} id={dataset.id} key={dataset.id}>
                  {dataset.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        );

      case 2:
        return (
          <div>
            <Typography variant="h6" gutterBottom>
              Give it a name!:
            </Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              autoFocus
            />
          </div>
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();

    return (
      <React.Fragment>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.props.open}
          onClose={this.props.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={this.props.open}>
            <div className={classes.paper}>
              <Typography variant="h5" className={classes.title}>
                Train New Model
              </Typography>
              <div className={classes.root}>
                <Stepper activeStep={this.state.activeStep} alternativeLabel>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  {this.state.activeStep === steps.length ? (
                    <div className={classes.submitSection}>
                      <Button
                        onClick={this.handleReset}
                        className={classes.backButton}
                      >
                        Reset
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.submitButton}
                        onClick={this.handleSubmit}
                      >
                        Start Training
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Typography className={classes.instructions}>
                        {this.getStepContent(this.state.activeStep)}
                      </Typography>
                      <div className={classes.actionButtons}>
                        <Button
                          disabled={this.state.activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.backButton}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TrainModelModal);
