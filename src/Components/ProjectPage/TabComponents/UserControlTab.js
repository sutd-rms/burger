import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AutoCompleteField from './AutoCompleteField';
import { TextField } from '@material-ui/core';
import axios from 'axios';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function UserControlTab(props) {
  const [usersList, setUsersList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedRow, setSelectedRow] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [uidList, setUidList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [addFail, setAddFail] = useState(false);
  const [uid, setUid] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [userExisted, setUserExisted] = useState(false);
  const [projectUserList, setProjectUserList] = useState([]);

  // const [columns, setColumns] = useState();
  const columns = [
    {
      title: 'Email',
      field: 'email',
      editComponent: props => (
        <AutoCompleteField
          style={{ width: 600 }}
          onChange={onEmailSelect}
          options={allUsers}
          getCompanyName={getCompanyName}
        />
      )
    },
    {
      title: 'Company',
      field: 'company',
      cellStyle: { width: '300px' },
      editComponent: props => (
        <TextField value={organization ? organization : ''} disabled />
      )
    }
  ];

  const getCompanyName = id => {
    for (let i = 0; i < companyList.length; i++) {
      if (companyList[i].id === id) {
        return companyList[i].name;
      }
    }
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    axios
      .get('https://secret-sauce.azurewebsites.net/auth/company/', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(data => setCompanyList(data.data));
    
      const id = props.projectId;
    // FETCH & SET STATE
    axios
      .get(`https://secret-sauce.azurewebsites.net/portal/projects/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        setUidList(res.data.owners);
      });
  }, []);

  useEffect(() => {
    // FETCH & SET STATE
    let token = localStorage.getItem('token');

    axios
      .get('https://secret-sauce.azurewebsites.net/auth/users', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        setAllUsers(res.data);
        let userList = [];
        for (let i = 0; i < uidList.length; i++) {
          res.data.map(user => {
            if (user.id === uidList[i]) {
              let newUser = {
                id: user.id,
                company: getCompanyName(user.company),
                email: user.email
              };
              userList.push(newUser);
            }
          });
        }
        setUsersList(userList);
      });
  }, [companyList, uidList]);

  const onEmailSelect = opt => {
    if (opt != null) {
      setEmail(opt.email);
      setOrganization(getCompanyName(opt.company));
      setUid(opt.id);
    } else {
      setEmail('');
      setOrganization('');
      setUid('');
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
    setAddFail(false);
    setDeleteSuccess(false);
    setUserExisted(false);
  };

  return (
    <div>
      <Box>
        <Typography variant="h6">Project Members Management</Typography>
        <Typography variant="subtitle1">
          You can view and manage the users in this project here
        </Typography>
      </Box>

      <br />
      <MaterialTable
        title=""
        columns={columns}
        data={usersList}
        icons={tableIcons}
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        options={{
          filtering: true,
          exportButton: true,
          actionsColumnIndex: -1,
          rowStyle: rowData => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? '#EEE' : '#FFF'
          }),
          headerStyle: {
            backgroundColor: '#184085',
            color: '#FFF'
          }
        }}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                const obj = {
                  // name: this.state.name,
                  // surname: this.state.surname,
                  email: email,
                  company: organization
                  // number: phone
                };

                let repeatedUser = false;

                for (let i = 0; i < usersList.length; i++) {
                  if (obj.email === usersList[i].email) {
                    repeatedUser = true;
                    break;
                  }
                }
                if (repeatedUser) {
                  setUserExisted(true);
                } else {
                  const dataUpdate = usersList;
                  dataUpdate.push(obj);
                  //   API CALL UPDATE DATABASE
                  uidList.push(uid);
                  let newProject = { owners: uidList };
                  const id = props.projectId;
                  let token = localStorage.getItem('token');
                  axios
                    .patch(
                      `https://secret-sauce.azurewebsites.net/portal/projects/${id}`,
                      newProject,
                      {
                        headers: {
                          'Content-Type': 'application/json',
                          Accept: 'application/json',
                          Authorization: `Token ${token}`
                        }
                      }
                    )
                    .then(res => {
                      if (res.status === 200) {
                        // setUsersList(dataUpdate);
                        setSuccess(true);
                      } else {
                        setAddFail(true);
                      }
                    });
                }
                resolve();
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = usersList;
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                const deletedIdList = [];
                dataDelete.map(obj => {
                  deletedIdList.push(obj.id);
                });
                //   API CALL UPDATE DATABASE
                const id = props.projectId;
                let token = localStorage.getItem('token');
                const newProject = { owners: deletedIdList };
                axios
                  .patch(
                    `https://secret-sauce.azurewebsites.net/portal/projects/${id}`,
                    newProject,
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Token ${token}`
                      }
                    }
                  )
                  .then(res => {
                    if (res.status === 200) {
                      // setUsersList(dataDelete);
                      setDeleteSuccess(true);
                    } else {
                      setAddFail(true);
                    }
                  });
                resolve();
              }, 1000);
            })
        }}
      />
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          New user added to the project!
        </Alert>
      </Snackbar>
      <Snackbar
        open={userExisted}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          This user is already in the project!
        </Alert>
      </Snackbar>
      <Snackbar
        open={addFail}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Error! Please try again!
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          User deleted from the project!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UserControlTab;
