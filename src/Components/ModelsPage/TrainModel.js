import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import { useForm } from "react-hook-form";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default class TrainModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelId: props.id,
      datasetList: [],
      dataset: '',
      modelName: props.name,
      openDialog: true
    };
  }

  componentDidMount() {
    // FETCH & SET STATE
    this.setState({
      datasetList: [
        'Australis McDonald 2018 Autumn',
        'Australis McDonald 2019 Spring',
        'Australis McDonald 2020 Summer'
      ]
    });
  }

  handleDatasetChange = data => {
    console.log(data.target.value);
    this.setState({
      dataset: data.target.value
    });
  };

  handleClick = () => {
    // API CALL TRAIN MODEL
    console.log(this.state.dataset, this.props.id);
    // AWAIT AND HANDLE ERROR
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  render() {
    return (
      <Dialog
        fullWidth={true}
        onClose={this.props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={this.state.openDialog}
      >
        <MuiDialogTitle
          id="customized-dialog-title"
          onClose={this.props.handleClose}
        >
          Train a new Model
        </MuiDialogTitle>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <form noValidate onSubmit={this.handleClick}>
              <Typography variant="h6" gutterBottom>
                Selected Model:
              </Typography>
              <TextField
                variant="outlined"
                required
                fullWidth
                disabled
                id="selectedModel"
                key="selectedModel"
                value={this.props.name}
                autoFocus
              />
              <Typography variant="h6" gutterBottom>
                Select a Dataset to Train the Model
              </Typography>
              <Select
                labelId="dataset"
                id="dataset"
                key="dataset"
                fullWidth
                value={this.state.dataset}
                onChange={this.handleDatasetChange}
              >
                {this.state.datasetList.map(value => (
                  <MenuItem value={value} id={value} key={value}>
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
                >
                  Submit Training Request
                </Button>
              </Box>
            </form>
          </div>
        </Container>
      </Dialog>
    );
  }
}
