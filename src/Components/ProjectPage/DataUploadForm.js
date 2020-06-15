import React from 'react';
import { Button, Box } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    textAlign: 'center'
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
      files: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const form = {
      file: this.state.files
    };
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          value="Submit"
          onClick={this.handleSubmit}
        >
          UPLOAD
        </Button>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DataUploadForm);
