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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

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
  },
  constraintItems: {
    border: '1px solid #ced4da'
  },
  table: {
    maxHeight: 440,
    width: 400
  },
  tableHeader: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  }
});

function getSteps() {
  return ['Variable Selection', 'Constraint Creation'];
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

const ItemsFormInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },

  input: {
    position: 'relative',
    border: '1px solid #ced4da',
    width: '150px',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  }
}))(InputBase);

const InitialConstraintState = {
  inequality: '=',
  rhs: '',
  penalty: 'hard',
  penaltyScore: '',
  constraintName: '',
  constraintItems: [],
  createConstraintError: false
};

const initialState = {
  activeStep: 0,
  inequalities: ['=', '<', '<=', '>', '>='],
  inequality: '=',
  rhs: '',
  penalty: 'hard',
  penaltyScore: '',
  constraintName: '',
  constraintItems: [],
  items: [],
  createConstraintError: false,
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

class AddConstraintModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleConstraintsInputChange = this.handleConstraintsInputChange.bind(
      this
    );
    this.handleItemsChange = this.handleItemsChange.bind(this);
    this.createConstraintsItemsArray = this.createConstraintsItemsArray.bind(
      this
    );
    this.createConstraintsForm = this.createConstraintsForm.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addAnotherConstraint = this.addAnotherConstraint.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    if (this.state.penalty == 'hard') {
      this.setState({
        penaltyScore: ''
      });
    }
  }

  handleConstraintsInputChange = idx => event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const newConstraints = this.state.constraintItems.map(item => {
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
      constraintItems: newConstraints
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
    if (this.state.activeStep == 0 && this.state.items.length > 0) {
      this.createConstraintsItemsArray(this.state.items);
    }
    if (this.state.activeStep == 0 && this.state.items.length <= 0) {
      return;
    }
    if (this.state.activeStep == 1) {
      for (var constraint of this.state.constraintItems) {
        if (constraint.coefficient == '') {
          this.setState({
            createConstraintError: true
          });
          return;
        }
      }
      if (
        this.state.rhs == '' ||
        this.state.constraintName == '' ||
        (this.state.penalty == 'soft' && this.state.penaltyScore == '')
      ) {
        this.setState({
          createConstraintError: true
        });
        return;
      }
    }
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  }

  handleBack(event) {
    if (this.state.activeStep == 1) {
      this.setState(InitialConstraintState);
    }
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  }

  handleReset(event) {
    this.setState(initialState);
  }

  addAnotherConstraint(event) {
    this.setState(InitialConstraintState);
    this.setState({
      activeStep: 0,
      items: []
    });
  }

  handleClose(event) {
    this.handleReset();
    this.props.handleClose();
  }

  handleSubmit(event) {
    //Make POST request here
    this.props.handleClose();
    this.props.showAlert();
    this.handleReset();
  }

  createConstraintsItemsArray(selectedItems) {
    this.state.constraintItems = [];
    selectedItems.forEach((selectedItem, idx) =>
      this.state.constraintItems.push({
        id: idx,
        item: selectedItem,
        coefficient: ''
      })
    );
  }

  createConstraintsForm() {
    const { classes } = this.props;
    const listItems = this.state.constraintItems.map((constraint, idx) => [
      constraint.item,
      <ItemsFormInput
        name="coefficient"
        type="number"
        value={constraint.coefficient}
        required
        onChange={this.handleConstraintsInputChange(idx)}
      />
    ]);

    return (
      <Box display="flex">
        <Box mr={15} mt={5} className={classes.constraintItems}>
          <TableContainer component={Paper} className={classes.table}>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeader}>Item</TableCell>
                  <TableCell className={classes.tableHeader}>
                    Coefficient*
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listItems.map(row => (
                  <TableRow key={row[0]}>
                    <TableCell component="th" scope="row">
                      {row[0]}
                    </TableCell>
                    <TableCell>{row[1]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box ml={15}>
          <Box textAlign="left">
            <Box mt={5}>
              <FormControl required>
                <InputLabel shrink htmlFor="title-input">
                  Name of Constraint
                </InputLabel>
                <FormInput
                  id="title-input"
                  name="constraintName"
                  value={this.state.constraintName}
                  onChange={this.handleInputChange}
                />
              </FormControl>
            </Box>
            <Box mt={5}>
              <FormControl required>
                <InputLabel shrink htmlFor="title-input">
                  Inequality
                </InputLabel>
                <NativeSelect
                  name="inequality"
                  defaultValue="="
                  value={this.state.inequality}
                  input={<FormInput />}
                  onChange={this.handleInputChange}
                >
                  {this.state.inequalities.map(value => (
                    <option value={value}>{value}</option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Box>
            <Box mt={5}>
              <FormControl required>
                <InputLabel shrink htmlFor="title-input">
                  RHS
                </InputLabel>
                <FormInput
                  id="title-input"
                  name="rhs"
                  type="number"
                  value={this.state.rhs}
                  onChange={this.handleInputChange}
                />
              </FormControl>
            </Box>
            <Box mt={5}>
              <FormControl required>
                <InputLabel shrink htmlFor="title-input">
                  Penalty
                </InputLabel>
                <NativeSelect
                  name="penalty"
                  defaultValue="hard"
                  value={this.state.penalty}
                  input={<FormInput />}
                  onChange={this.handleInputChange}
                >
                  <option value="hard">Hard</option>
                  <option value="soft">Soft</option>
                </NativeSelect>
              </FormControl>
            </Box>
            <Box mt={5}>
              <FormControl>
                <InputLabel shrink htmlFor="title-input">
                  Score
                </InputLabel>
                <FormInput
                  id="title-input"
                  name="penaltyScore"
                  type="number"
                  disabled={this.state.penalty == 'soft' ? false : true}
                  value={this.state.penaltyScore}
                  onChange={this.handleInputChange}
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Box display="flex" justifyContent="center">
            <Box mt={5}>
              <Box display="flex" alignItems="center">
                <Typography variant="h6">
                  Choose items for constraint creation
                </Typography>
                <Tooltip
                  title="Items selected will be used for constraint creation"
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

      case 1:
        return (
          <Box mx={15}>
            <Typography variant="h6" gutterBottom={true}>
              Create Constraints
            </Typography>
            {this.state.createConstraintError == false ? null : (
              <Typography variant="subtitle" color="error">
                Please fill up all required fields
              </Typography>
            )}
            {this.createConstraintsForm()}
          </Box>
        );
      case 2:
        return (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h6">Constraint Created!</Typography>
            <CheckCircleOutlineIcon
              style={{ color: 'green', marginLeft: '10px' }}
            />
          </Box>
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();

    const renderButtons = () => {
      if (this.state.activeStep === 0) {
        return (
          <div>
            <Typography className={classes.instructions}>
              {this.getStepContent(this.state.activeStep)}
            </Typography>
            <div className={classes.actionButtons}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNext}
              >
                Next
              </Button>
            </div>
          </div>
        );
      }
      if (this.state.activeStep === 1) {
        return (
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
                style={{ backgroundColor: 'green', color: 'white' }}
                onClick={this.handleNext}
              >
                Add Constraint
              </Button>
            </div>
          </div>
        );
      }
      if (this.state.activeStep === 2) {
        return (
          <div>
            <Typography className={classes.instructions}>
              {this.getStepContent(this.state.activeStep)}
            </Typography>
            <div className={classes.actionButtons}>
              <Button
                disabled={this.state.activeStep === 0}
                onClick={this.handleClose}
                className={classes.backButton}
              >
                Quit
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.addAnotherConstraint}
              >
                Add Another Constraint
              </Button>
            </div>
          </div>
        );
      } else {
        return (
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
        );
      }
    };

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
                Add a Constraint
              </Typography>
              <div className={classes.root}>
                <Stepper activeStep={this.state.activeStep} alternativeLabel>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div>{renderButtons()}</div>
              </div>
            </div>
          </Fade>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AddConstraintModal);