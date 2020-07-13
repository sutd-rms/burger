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
    height: '300px',
    border: '1px solid #ced4da'
  }
});

function getSteps() {
  return [
    'Dataset Selection',
    'Name Input',
    'Variable Selection',
    'Constraint Creation'
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
    width: '50px',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  }
}))(InputBase);

const initialState = {
  name: '',
  activeStep: 2,
  datasetList: ['random_csv_file.csv', 'iloverms.csv', 'test.csv'],
  dataset: 'random_csv_file.csv',
  inequalities: ['=', '<', '<=', '>', '>='],
  inequality: '=',
  rhs: '',
  penalty: 'hard',
  penaltyScore: '',
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

class ConstraintModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

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
    this.handleClose = this.handleClose.bind(this);
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
    if (this.state.activeStep == 2) {
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
    this.setState(initialState);
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

  createConstraintsArray(selectedItems) {
    console.log('here');
    this.state.constraints = [];
    selectedItems.forEach((selectedItem, idx) =>
      this.state.constraints.push({
        id: idx,
        item: selectedItem,
        coefficient: ''
      })
    );
  }

  createConstraintsForm() {
    const { classes } = this.props;
    const listItems = this.state.constraints.map((constraint, idx) => [
      constraint.item,
      <FormInput
        name="coefficient"
        value={constraint.coefficient}
        onChange={this.handleConstraintsInputChange(idx)}
      />
    ]);
    // <Box display="flex" alignItems="center" justifyContent="center" px={10} pb={2}>
    //   <Box mr={5}>
    //     <Typography>Item</Typography>
    //     <Typography>{constraint.item}:</Typography>
    //   </Box>
    //   <Box>
    //     <FormControl>
    //       <InputLabel shrink htmlFor="title-input">
    //         Coefficient
    //       </InputLabel>
    //       <FormInput
    //         id="title-input"
    //         name="coefficient"
    //         value={constraint.coefficient}
    //         onChange={this.handleConstraintsInputChange(idx)}
    //       />
    //     </FormControl>
    //   </Box>
    // </Box>

    return (
      <Box display="flex">
        <Box mr={10} className={classes.constraintItems}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Coefficient</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listItems.map(row => (
                  <TableRow key={row[0]}>
                    <TableCell component="th" scope="row">
                      {row[0]}
                    </TableCell>
                    <TableCell align="right">{row[1]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box ml={10}>
          <Box textAlign="center">
            <Box mt={5}>
              <FormControl>
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
              <FormControl>
                <InputLabel shrink htmlFor="title-input">
                  RHS
                </InputLabel>
                <FormInput
                  id="title-input"
                  name="rhs"
                  value={this.state.rhs}
                  onChange={this.handleInputChange}
                />
              </FormControl>
            </Box>
            <Box mt={5}>
              <FormControl>
                <InputLabel shrink htmlFor="title-input">
                  Penalty
                </InputLabel>
                <NativeSelect
                  name="penalty"
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
                  defaultValue="hard"
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

      case 2:
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

      case 3:
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

    const renderButtons = () => {
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
                color="primary"
                onClick={this.handleNext}
              >
                Create Constraint Set
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
                variant="contained"
                color="primary"
                onClick={this.handleNext}
              >
                Next
              </Button>
            </div>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                color="secondary"
                disabled={this.state.activeStep === 0}
                onClick={this.handleClose}
              >
                Skip Constraint Creation
              </Button>
            </Box>
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
                {this.state.activeStep <= 1
                  ? 'Constraint Set Creation'
                  : 'Add a Constraint'}
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
                  {renderButtons()}
                  {/* {this.state.activeStep === steps.length ? (
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
                  )} */}
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
