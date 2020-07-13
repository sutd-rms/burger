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
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

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
    padding: theme.spacing(8, 15, 8),
    width: '80vw'
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
  return ['Dataset Selection', 'Item Selection', 'Constraint Creation'];
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
    width: '50px',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  }
}))(InputBase);

class ConstraintModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      datasetList: ['random_csv_file.csv', 'iloverms.csv', 'test.csv'],
      dataset: 'random_csv_file.csv',
      inequalities: ['=', '<', '<=', '>', '>='],
      constraints: '',
      constraints: [],
      items: [],
      allitems: [
        '1102',
        '1103',
        '1104',
        '1105',
        '1106',
        '1107',
        '1108',
        '3102',
        '3106',
        '3109',
        '4102',
        '5102',
        '5602',
        '5802',
        '6102',
        '7102',
        '8102',
        '9102',
        '9202'
      ]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleConstraintsInputChange = this.handleConstraintsInputChange.bind(
      this
    );
    this.handleItemsChange = this.handleItemsChange.bind(this);
    this.createConstraintsArray = this.createConstraintsArray.bind(this);
    this.createConstraintsForm = this.createConstraintsForm.bind(this);
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

    this.setState({
      [name]: value
    });
  }

  handleConstraintsInputChange = idx => event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const newConstraints = this.state.constraints.map(item => {
      if (item.id === idx) {
        const updatedItem = {
          ...item,
          [name]: value
        };

        return updatedItem;
      }

      return item;
    });

    this.setState({
      constraints: newConstraints
    });
  };

  handleItemsChange(event, values) {
    if (values.length > 10) {
      return;
    }
    this.setState({
      items: values
    });
  }

  handleNext(event) {
    if (this.state.activeStep == 1) {
      this.createConstraintsArray(this.state.items);
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
    //Make POST request here
    this.props.handleClose();
    this.props.showAlert();
    this.handleReset();
  }

  createConstraintsArray(selectedItems) {
    this.state.constraints = [];
    selectedItems.forEach((selectedItem, idx) =>
      this.state.constraints.push({
        id: idx,
        item: selectedItem,
        coefficient: '',
        inequality: '',
        rhs: ''
      })
    );
  }

  createConstraintsForm() {
    const listItems = this.state.constraints.map((constraint, idx) => (
      <Box display="flex" alignItems="center" mt={5}>
        <Box mr={5}>
          <Typography>Item</Typography>
          <Typography>{constraint.item}:</Typography>
        </Box>
        <Box mr={5}>
          <FormControl>
            <InputLabel shrink htmlFor="title-input">
              Coefficient
            </InputLabel>
            <FormInput
              id="title-input"
              name="coefficient"
              value={constraint.coefficient}
              onChange={this.handleConstraintsInputChange(idx)}
            />
          </FormControl>
        </Box>
        <Box mr={5}>
          <FormControl>
            <InputLabel shrink htmlFor="title-input">
              Inequality
            </InputLabel>
            <NativeSelect
              name="inequality"
              value={constraint.inequality}
              input={<FormInput />}
              onChange={this.handleConstraintsInputChange(idx)}
            >
              {this.state.inequalities.map(value => (
                <option value={value}>{value}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <InputLabel shrink htmlFor="title-input">
              RHS
            </InputLabel>
            <FormInput
              id="title-input"
              name="rhs"
              value={constraint.rhs}
              onChange={this.handleConstraintsInputChange(idx)}
            />
          </FormControl>
        </Box>
      </Box>
    ));

    return listItems;
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <Typography variant="h6" gutterBottom>
              Select a Dataset for creating constraints:
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

      case 1:
        return (
          <Box display="flex" justifyContent="center">
            <Box mt={5}>
              <Box display="flex" alignItems="center">
                <Typography variant="h6">
                  Choose items for constraint creation
                </Typography>
                <Tooltip
                  title="Items selected will be presented in the selected graph type"
                  placement="right"
                >
                  <IconButton aria-label="delete">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box style={{ width: 500 }}>
                <Autocomplete
                  multiple
                  options={this.state.allitems}
                  getOptionLabel={option => option}
                  onChange={this.handleItemsChange}
                  value={this.state.items}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="Search Item"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
        );

      case 2:
        return (
          <div>
            <Typography variant="h6">Create Constraints</Typography>
            {this.createConstraintsForm()}
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
                Create Constraints
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
                        ADD CONSTRAINT
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

export default withStyles(styles, { withTheme: true })(ConstraintModal);
