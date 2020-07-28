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
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FileDownload from 'js-file-download';
import axios from 'axios';

const token = localStorage.getItem('token');

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
  selectedItems: {
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
  return ['Variable Selection', 'Price Input'];
}

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

const InitialItemState = {
  selectedItems: [],
  createItemError: false
};

const initialState = {
  activeStep: 0,
  selectedItems: [],
  items: [],
  createItemError: false,
  allitems: [],
  itemMappings: {},
  isLoaded: false,
  finalPrices: {}
};

class WhatIfAnalysisModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleItemsInputChange = this.handleItemsInputChange.bind(this);
    this.handleItemsChange = this.handleItemsChange.bind(this);
    this.createItemsArray = this.createItemsArray.bind(this);
    this.createItemsForm = this.createItemsForm.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleItemsInputChange = idx => event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const newItems = this.state.selectedItems.map(item => {
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
      selectedItems: newItems
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
      this.createItemsArray(this.state.items);
    }
    if (this.state.activeStep == 0 && this.state.items.length <= 0) {
      return;
    }
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  }

  submitForm(event) {
    if (this.state.activeStep == 1) {
      for (var item of this.state.selectedItems) {
        if (item.price == '') {
          this.setState({
            createItemError: true
          });
          return;
        }
      }
    }

    let form = this.state.finalPrices;

    this.state.selectedItems.forEach(item => {
      form['prices'][item.item] = parseFloat(item.price);
    });

    axios
      .post(
        `https://secret-sauce.azurewebsites.net/portal/trainedmodels/${this.props.trainedModelId}/whatif/`,
        form,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`
          }
        }
      )
      .then(res => {
        if (res.status === 200 && res.status) {
          this.handleClose();
          FileDownload(res.data, `what_if_${this.props.trainedModelName}.csv`);
        }
      })
      .catch(err => {
        this.props.handleError();
        this.handleClose();
        this.setState({
          createItemError: false
        });
      });
  }

  handleBack(event) {
    if (this.state.activeStep == 1) {
      this.setState(InitialItemState);
    }
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  }

  handleReset(event) {
    this.setState({
      selectedItems: [],
      items: [],
      createItemError: false,
      createItemErrorMessage: '',
      finalPrices: {}
    });
  }

  handleClose(event) {
    this.handleReset();
    this.setState({
      activeStep: 0,
      isLoaded: false
    });
    this.props.handleClose();
  }

  componentDidUpdate() {
    if (this.props.open == true && this.state.isLoaded == false) {
      axios
        .get(
          `https://secret-sauce.azurewebsites.net/portal/datablocks/${this.props.datasetId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Token ${token}`
            }
          }
        )
        .then(res => {
          var itemDict = {};

          res.data.schema.forEach(item => {
            if (item.item_name != null) {
              itemDict[item.item_id] = item.item_id + ' - ' + item.item_name;
            } else {
              itemDict[item.item_id] = item.item_id;
            }
          });

          this.setState({
            allitems: res.data.schema.map(item => item.item_id),
            itemMappings: itemDict
          });
        });

      axios
        .get(
          `https://secret-sauce.azurewebsites.net/portal/datablocks/${this.props.datasetId}/average_prices`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Token ${token}`
            }
          }
        )
        .then(res => {
          var priceDict = {};
          priceDict['prices'] = res.data;
          this.setState({ finalPrices: priceDict });
        });

      this.setState({ isLoaded: true });
    }
  }

  createItemsArray(selectedItems) {
    this.state.selectedItems = [];
    selectedItems.forEach((selectedItem, idx) =>
      this.state.selectedItems.push({
        //Need id to allow for handling of items input change
        id: idx,
        item: selectedItem,
        price: ''
      })
    );
  }

  createItemsForm() {
    const { classes } = this.props;
    const listItems = this.state.selectedItems.map((item, idx) => [
      this.state.itemMappings[item.item],
      <ItemsFormInput
        name="price"
        type="number"
        value={item.price}
        required
        onChange={this.handleItemsInputChange(idx)}
      />
    ]);

    return (
      <Box display="flex">
        <Box mt={5} className={classes.selectedItems}>
          <TableContainer component={Paper} className={classes.table}>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeader}>Item</TableCell>
                  <TableCell className={classes.tableHeader}>Price*</TableCell>
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
                  Choose items for What-if Analysis
                </Typography>
                <Tooltip
                  title="Items selected will be used for what-if analysis."
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
                  getOptionLabel={option =>
                    this.state.itemMappings[option].toString()
                  }
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
              Input Prices for Items
            </Typography>
            {this.state.createItemError == false ? null : (
              <Typography variant="subtitle" color="error">
                Please fill up all required fields
              </Typography>
            )}
            {this.state.createItemErrorMessage == '' ? null : (
              <Typography variant="subtitle" color="error">
                {this.state.createItemErrorMessage}
              </Typography>
            )}
            {this.createItemsForm()}
          </Box>
        );
      case 2:
        return (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h6">What-If Analysis Succeeded!</Typography>
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
                onClick={this.submitForm}
              >
                Run What-if Analysis
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
                What-if Analysis
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

export default withStyles(styles, { withTheme: true })(WhatIfAnalysisModal);
