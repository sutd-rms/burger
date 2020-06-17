import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import DataUploadForm from '../DataUploadForm';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto'
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
  toolbarButton: {
    // padding: theme.spacing(1),
    flexShrink: 0,
    margin: theme.spacing(1)
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const { title } = props;

  let [displayDataUploadForm, setDisplayDataUploadForm] = useState(false);

  let handleDataClick = e => {
    setDisplayDataUploadForm(true);
  };
  let handleCloseDataUploadForm = e => {
    setDisplayDataUploadForm(false);
  };

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          className={classes.toolbarTitle}
        >
          Project Overciew:
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button
          variant="outlined"
          size="small"
          className={classes.toolbarButton}
        >
          Edit
        </Button>

        <Button
          variant="outlined"
          size="small"
          onClick={handleDataClick}
          className={classes.toolbarButton}
        >
          Upload Data
        </Button>
        <Button
          variant="outlined"
          size="small"
          className={classes.toolbarButton}
        >
          Simulation
        </Button>
      </Toolbar>

      <DataUploadForm
        handleCloseDataUploadForm={handleCloseDataUploadForm}
        displayDataUploadForm={displayDataUploadForm}
      />
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string
};
