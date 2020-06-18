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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
      success: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const form = {
      file: this.state.files
    };
    this.setState({
      success: true
    });
    // WAIT AND REFRESH PAGE HERE
    setTimeout(function() {
      window.location.reload(false);
    }, 2000);
  }

  handleCloseSnackbar(event) {
    this.setState({ success: false });
  }

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
          Upload new Dataset
        </MuiDialogTitle>
        <div className={classes.root}>
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
                      this.state.files.length == 0 ? null : classes.uploaded
                    }`}
                  />
                  <p>
                    {this.state.files.length == 0
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
        <Snackbar
          open={this.state.success}
          autoHideDuration={800}
          // onClose={this.handleCloseSnackbar}
        >
          <Alert severity="success">New dataset uploaded successfully!</Alert>
        </Snackbar>
      </Dialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DataUploadForm);
