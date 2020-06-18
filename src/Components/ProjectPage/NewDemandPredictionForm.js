import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function NewDemandPredictionForm(props) {
  const [modelList, setModelList] = useState(['MCMC', 'Brute Force']);
  const [model, setModel] = useState('');
  const [success, setSuccess] = useState(false);
  const [datasetList, setDatasetList] = useState([
    'McDanold Australia 2018',
    'McDanold SG 2019',
    'McDanold Australia 2019 Spring',
    'McDanold SG 2020 Summer'
  ]);
  const [dataset, setDataset] = useState('');
  const [item, setItem] = useState('');
  const [itemList, setItemList] = useState([
    'Big Mac',
    'Mid-Fries',
    'Apple Pie',
    'Nuggets',
    'McFlurries',
    'Cheese Burger'
  ]);

  const onFormSubmission = e => {
    e.preventDefault();
    // ADD API CALL HERE, check for repeated request
    console.log(
      'creating new search with model: ',
      model,
      ', dataset: ',
      dataset,
      ', item: ',
      item
    );
    props.handleClose();
    setSuccess(true);
  };

  const handleDatasetChange = e => {
    // fetch available itemList, setItemList
    setDataset(e.target.value);
  };

  const handleItemChange = e => {
    setItem(e.target.value);
  };

  const handleModelChange = e => {
    // first called, fetch datasetlist and setDatasetList
    setModel(e.target.value);
  };

  const handleCloseSnackbar = e => {
    setSuccess(false);
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          New Demand Prediction
        </DialogTitle>
        <DialogContent dividers>
          <form noValidate onSubmit={onFormSubmission}>
            <Typography variant="subtitle2" gutterBottom>
              Select Model Type
            </Typography>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              fullWidth
              value={model}
              onChange={handleModelChange}
            >
              {modelList.map(value => (
                <MenuItem value={value} id={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="subtitle2" gutterBottom>
              Select a Dataset
            </Typography>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              fullWidth
              value={dataset}
              onChange={handleDatasetChange}
            >
              {datasetList.map(value => (
                <MenuItem value={value} id={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="subtitle2" gutterBottom>
              Select an Item
            </Typography>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              fullWidth
              value={item}
              onChange={handleItemChange}
            >
              {itemList.map(value => (
                <MenuItem value={value} id={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            <Box m={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                mt={1}
              >
                Predict
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          New prediction created!
        </Alert>
      </Snackbar>
    </div>
  );
}
