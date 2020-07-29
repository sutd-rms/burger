import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DashboardTopNav from './../DashboardTopNav';
import UsersTable from './UsersTable';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserInvitationModal from './UserInvitationModal';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CompanyTable from './CompanyTable';
import CompanyCreationModal from './CompanyCreationModal';

const useStyles = makeStyles(theme => ({
  CompanyButton: {
    marginLeft: 15
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AllUsersPage(props) {
  const classes = useStyles();
  const [allUsers, setAllUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successCompany, setSuccessCompany] = useState(false);

  let match = useRouteMatch();

  const handleCloseSnackbar = e => {
    setSuccess(false);
    setSuccessCompany(false);
  };

  let handleOpenModal = () => {
    setOpen(true);
  };

  let handleOpenCompanyModal = () => {
    setOpenCompany(true);
  };

  let handleClose = () => {
    setOpen(false);
  };

  let handleCloseCompany = () => {
    setOpenCompany(false);
  };

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:userId`}>
          <User />
        </Route>
        <Route path={match.path}>
          <DashboardTopNav title="user management" />
          <Box
            mb={5}
            px={1}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="subtitle1">
                You can invite new user or manage the users here.
              </Typography>
            </Box>
            <Box>
              <Button variant="outlined" onClick={handleOpenModal}>
                Invite New User
              </Button>
              <Button
                variant="outlined"
                onClick={handleOpenCompanyModal}
                className={classes.CompanyButton}
              >
                Create New Company
              </Button>
            </Box>
          </Box>
          <UsersTable data={allUsers} />
          <Box mt={5}>
            <CompanyTable />
          </Box>
        </Route>
      </Switch>
      <UserInvitationModal
        open={open}
        handleClose={handleClose}
        setSuccess={setSuccess}
      />
      <CompanyCreationModal
        open={openCompany}
        handleClose={handleCloseCompany}
        setSuccess={setSuccessCompany}
      />
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          New User created! An invite will be sent out shortly!
        </Alert>
      </Snackbar>
      <Snackbar
        open={successCompany}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          New Company created!
        </Alert>
      </Snackbar>
    </div>
  );
}

function User() {
  let { userId } = useParams();

  return <h3>Requested user ID: {userId}</h3>;
}
