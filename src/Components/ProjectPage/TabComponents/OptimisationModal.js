import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
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
    marginBottom: theme.spacing(1)
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
  return [
    'Trained Model Selection',
    'Constraint Selection',
    'Parameter Selection'
  ];
}

const FormInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },

  input: {
    position: 'relative',
    border: '1px solid #ced4da',
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  }
}))(InputBase);

const token = localStorage.getItem('token');

class OptimisationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      modelList: [],
      modelListMapping: {},
      model: '',
      constraintsetList: [],
      constraintsetListMapping: {},
      constraintset: '',
      population: '',
      maxEpoch: '',
      objectiveList: ['Max Revenue'],
      objective: 'Max Revenue',
      costFileUploaded: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
    if (this.state.activeStep == 0 && this.state.model == '') {
      return;
    }
    if (this.state.activeStep == 1 && this.state.constraintset == '') {
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

  handleClose(event) {
    this.setState({
      activeStep: 0,
      model: '',
      constraintset: '',
      population: '',
      maxEpoch: ''
    });
    this.props.handleClose();
  }

  handleSubmit(event) {
    //Make POST request here
    if (
      this.state.objective == '' ||
      this.state.population == '' ||
      this.state.maxEpoch == ''
    ) {
      return;
    }

    this.props.handleClose();
    this.props.showAlert();
    this.handleReset();
  }

  componentDidMount() {
    axios
      .get(`https://secret-sauce.azurewebsites.net/portal/trainedmodels`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        },
        params: { project: this.props.projectId }
      })
      .then(res => {
        var trainedModels = [];
        var trainedModelsMappings = {};

        res.data.forEach(trainedModel => {
          trainedModels.push(trainedModel.id);
          trainedModelsMappings[trainedModel.id] = trainedModel.name;
        });
        this.setState({
          modelList: trainedModels,
          modelListMapping: trainedModelsMappings
        });
      });

    axios
      .get(`https://secret-sauce.azurewebsites.net/portal/constraintsets/`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        },
        params: { project: this.props.projectId }
      })
      .then(res => {
        var constraintSets = [];
        var constraintSetsMappings = {};

        res.data.forEach(set => {
          constraintSets.push(set.id);
          constraintSetsMappings[set.id] = set.name;
        });
        this.setState({
          constraintsetList: constraintSets,
          constraintsetListMapping: constraintSetsMappings
        });
      });

    axios
      .get(
        `https://secret-sauce.azurewebsites.net/portal/projects/${this.props.projectId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`
          }
        }
      )
      .then(res => {
        this.setState({
          costFileUploaded: res.data.cost_sheet ? true : false,
          objectiveList: res.data.cost_sheet
            ? ['Max Revenue', 'Max Profit']
            : ['Max Revenue']
        });
      });
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <Typography variant="h6" gutterBottom>
              Select a Trained Model:
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
                <MenuItem value={model} id={model} key={model}>
                  {this.state.modelListMapping[model]}
                </MenuItem>
              ))}
            </Select>
          </div>
        );

      case 1:
        return (
          <div>
            <Typography variant="h6" gutterBottom>
              Select a Constraint Set:
            </Typography>
            <Select
              labelId="constraintset"
              id="constraintset"
              key="constraintset"
              name="constraintset"
              fullWidth
              value={this.state.constraintset}
              onChange={this.handleInputChange}
            >
              {this.state.constraintsetList.map(constraintset => (
                <MenuItem
                  value={constraintset}
                  id={constraintset}
                  key={constraintset}
                >
                  {this.state.constraintsetListMapping[constraintset]}
                </MenuItem>
              ))}
            </Select>
          </div>
        );

      case 2:
        return (
          <div>
            <Typography variant="h6" gutterBottom>
              Select Parameters:
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Box mt={5}>
                  <FormControl required>
                    <InputLabel shrink htmlFor="title-input">
                      Population
                    </InputLabel>
                    <FormInput
                      id="population"
                      name="population"
                      type="number"
                      value={this.state.population}
                      onChange={this.handleInputChange}
                    />
                  </FormControl>
                </Box>
                <Box mt={5}>
                  <FormControl required>
                    <InputLabel shrink htmlFor="title-input">
                      Max Epoch
                    </InputLabel>
                    <FormInput
                      id="maxEpoch"
                      name="maxEpoch"
                      type="number"
                      value={this.state.maxEpoch}
                      onChange={this.handleInputChange}
                    />
                  </FormControl>
                </Box>
              </Box>
              <Box mt={5}>
                <FormControl required>
                  <InputLabel shrink htmlFor="title-input">
                    Inequality
                  </InputLabel>
                  <NativeSelect
                    name="objective"
                    value={this.state.objective}
                    input={<FormInput />}
                    onChange={this.handleInputChange}
                  >
                    {this.state.objectiveList.map(singleObjective => (
                      <option value={singleObjective}>{singleObjective}</option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Box>
            </Box>
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
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={this.props.open}>
            <div className={classes.paper}>
              <Typography variant="h5" className={classes.title}>
                Run Optimisation
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
                  {this.state.activeStep === steps.length - 1 ? (
                    <div>
                      <Typography className={classes.instructions}>
                        {this.getStepContent(this.state.activeStep)}
                      </Typography>
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
                          Optimise
                        </Button>
                      </div>
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

export default withStyles(styles, { withTheme: true })(OptimisationModal);
