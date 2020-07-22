import React from 'react';
import { Button, Box } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const styles = theme => ({
  dialog: {
    margin: 0,
    padding: theme.spacing(2)
  },
  root: {
    textAlign: 'center',
    justifyContent: 'center'
  },

  uploadIcon: {
    fontSize: '3em',
    marginBottom: 10
  },

  dropContainer: {
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
  },

  uploaded: {
    color: '#3176D2'
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class DataUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = files => {
      this.setState({
        files
      });
    };
    this.state = {
      files: [],
      success: false,
      datasetName: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state.files);

    var formData = new FormData();
    formData.append('upload', this.state.files[0]);
    formData.append('project', this.props.projectId);
    formData.append('name', this.state.datasetName);

    // for (let i = 0; i < this.state.files.length; i++) {
    //   if (this.state.files[i].type !== '.csv') {
    //     alert('File type not accepted, please upload a CSV file');
    //   }
    // }
    if (this.state.files.length < 1) {
      this.props.noFileSelected();
    } else {
      let token = localStorage.getItem('token');
      axios
        .post(
          'https://secret-sauce.azurewebsites.net/portal/datablocks/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json',
              Authorization: `Token ${token}`
            }
          }
        )
        .then(res => {
          console.log(res);
          this.setState({
            success: true
          });
          this.props.successUpload(this.state.datasetName);
          this.props.handleCloseDataUploadForm();
        })
        .catch(error => {
          this.props.handleUploadFail();
          this.props.handleCloseDataUploadForm();
        });
      // this.props.handleWrongType();
    }
  };

  handleNameChange = evt => {
    this.setState({ datasetName: evt.target.value });
  };

  render() {
    const { classes } = this.props;

    const files = this.state.files.map(file => (
      <span key={file.name}>
        <AttachmentIcon />
        <Box component="span" ml={1} mr={2}>
          {file.name} - {file.size} bytes
        </Box>
        <CheckCircleOutlineIcon style={{ fill: 'green' }} />
      </span>
    ));

    return (
      <Dialog
        fullWidth={true}
        onClose={this.props.handleCloseDataUploadForm}
        aria-labelledby="customized-dialog-title"
        open={this.props.displayDataUploadForm}
      >
        <MuiDialogTitle
          id="customized-dialog-title"
          onClose={this.props.handleCloseDataUploadForm}
        >
          {this.props.createNew
            ? 'Create a New Dataset'
            : 'Upload new data for: ' + this.props.datasetName}
        </MuiDialogTitle>
        <br />
        <div className={classes.root}>
          {this.props.createNew ? (
            <Box p={2} m={2}>
              <TextField
                id="standard-basic"
                label="Dataset Name"
                onChange={this.handleNameChange}
                value={this.state.datasetName}
                fullWidth
              />
            </Box>
          ) : (
            ''
          )}
          <Dropzone
            onDrop={this.onDrop}
            disabled={this.state.disableUpload}
            multiple={false}
            accept=".csv"
          >
            {({ getRootProps, getInputProps }) => (
              <section className="container" className={classes.dropContainer}>
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <CloudUploadIcon
                    className={`${classes.uploadIcon} ${
                      this.state.files.length === 0 ? null : classes.uploaded
                    }`}
                  />
                  <p>
                    {this.state.files.length === 0
                      ? "Drag 'n' Drop your CSV file here, or click to select file"
                      : 'Click to Change File'}
                  </p>
                  {files}
                </div>
              </section>
            )}
          </Dropzone>
          <Box m={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              value="Submit"
              onClick={this.handleSubmit}
            >
              UPLOAD
            </Button>
          </Box>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DataUploadForm);
