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
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { Box } from '@material-ui/core';

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
    'Dataset Selection',
    'Cost Upload',
    'Constraint Selection'
  ];
}

class OptimisationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      modelList: ['Test Model', 'Test Model 2', 'Test Model2', 'ABC Test'],
      model: 'Test Model',
      datasetList: ['random_csv_file.csv', 'iloverms.csv', 'test.csv'],
      dataset: 'random_csv_file.csv',
      constraintsetList: [
        'Sample Constraint 1',
        'Testing Constraints',
        'McDonalds Aussie',
        'Sample Constraint 2'
      ],
      constraintset: 'Sample Constraint 1',
      name: null,
      file: []
    };
    this.onDrop = files => {
      this.setState({
        file: files
      });
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
    //Make POST request here
    this.props.handleClose();
    this.props.showAlert();
    this.handleReset();
  }

  getStepContent(stepIndex) {
    const files = this.state.file.map(file => (
      <span key={file.name}>
        <AttachmentIcon />
        <Box component="span" ml={1} mr={2}>
          {file.name} - {file.size} bytes
        </Box>
        <CheckCircleOutlineIcon style={{ fill: 'green' }} />
      </span>
    ));

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
              {this.state.modelList.map(value => (
                <MenuItem value={value} id={value} key={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </div>
        );
      case 1:
        return (
          <div>
            <Typography variant="h6" gutterBottom>
              Select a Dataset:
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
              {this.state.datasetList.map(value => (
                <MenuItem value={value} id={value} key={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </div>
        );

      case 2:
        return (
          <div>
            <Typography variant="h6" gutterBottom>
              Upload cost dataset:
            </Typography>
            <div
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                marginTop: '20px'
              }}
            >
              <Dropzone
                onDrop={this.onDrop}
                disabled={this.state.disableUpload}
                multiple={false}
                accept=".csv"
              >
                {({ getRootProps, getInputProps }) => (
                  <section
                    style={{
                      width: 500,
                      padding: 100,
                      border: 3,
                      borderRadius: 10,
                      borderColor: '#EEEEEE',
                      borderStyle: 'dashed',
                      color: 'grey',
                      margin: 'auto',
                      marginBottom: 50,
                      backgroundColor: '#FAFAFA'
                    }}
                  >
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <CloudUploadIcon
                        style={{ fontSize: '3em', marginBottom: 10 }}
                        style={{
                          color:
                            this.state.file.length === 0 ? 'grey' : '#3176D2'
                        }}
                      />
                      <p>
                        {this.state.file.length === 0
                          ? "Drag 'n' Drop your CSV file here, or click to select file"
                          : 'Click to Change File'}
                      </p>
                      {files}
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </div>
        );

      case 3:
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
              {this.state.constraintsetList.map(value => (
                <MenuItem value={value} id={value} key={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
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
                        Optimise
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

export default withStyles(styles, { withTheme: true })(OptimisationModal);
