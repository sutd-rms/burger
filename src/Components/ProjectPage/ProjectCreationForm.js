import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
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

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function ProjectCreationForm(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState(null);

  const onFormSubmission = e => {
    e.preventDefault();
    // ADD API CALL HERE
    console.log(
      "creating new project with name: ",
      name,
      ", description: ",
      description,
      ", company: ",
      company
    );
    props.handleClose();
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <Dialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Create New Project
        </DialogTitle>
        <DialogContent dividers>
          <form noValidate onSubmit={onFormSubmission}>
            <Typography gutterBottom>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="projectName"
              label="Project Name"
              name="Project Name"
              value={name}
              onChange={handleNameChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={handleDescriptionChange}
              name="description"
              label="Project Description"
              id="description"
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
