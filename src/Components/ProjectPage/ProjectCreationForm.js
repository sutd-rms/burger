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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";

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
  const [company, setCompany] = useState("");
  const [companyList, setCompanyList] = useState([
    "RMS",
    "McDonald Australia",
    "McDonald SG"
  ]);
  const [modelList, setModelList] = useState(["MCMC", "Brute Force"]);
  const [defaultModel, setDefaultModel] = useState("");

  const onFormSubmission = e => {
    e.preventDefault();
    // ADD API CALL HERE
    console.log(
      "creating new project with name: ",
      name,
      ", description: ",
      description,
      ", company: ",
      company,
      ", model: ",
      defaultModel
    );
    props.handleClose();
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleCompanyChange = e => {
    setCompany(e.target.value);
  };

  const handleModelChange = e => {
    setDefaultModel(e.target.value);
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
          Create New Project
        </DialogTitle>
        <DialogContent dividers>
          <form noValidate onSubmit={onFormSubmission}>
            <Typography variant="subtitle2" gutterBottom>
              Project Name
            </Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="projectName"
              name="Project Name"
              value={name}
              onChange={handleNameChange}
              autoFocus
            />
            <Typography variant="subtitle2" gutterBottom>
              Project Description
            </Typography>
            <TextField
              variant="outlined"
              required
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={handleDescriptionChange}
              name="description"
              id="description"
            />
            <Typography variant="subtitle2" gutterBottom>
              Client Company
            </Typography>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              fullWidth
              value={company}
              onChange={handleCompanyChange}
            >
              {companyList.map(value => (
                <MenuItem value={value}>{value}</MenuItem>
              ))}
            </Select>
            <Typography variant="subtitle2" gutterBottom>
              Default Model for this Project
            </Typography>
            <Select
              labelId="model"
              id="model"
              fullWidth
              value={defaultModel}
              onChange={handleModelChange}
            >
              {modelList.map(value => (
                <MenuItem value={value}>{value}</MenuItem>
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
                Create
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
