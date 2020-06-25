import React from 'react';
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

class UserControlTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [
        {
          name: 'Mehmet',
          surname: 'Baran',
          email: 'mehmet@gmail.com',
          organization: 'McDonaldsSG',
          number: '91234567'
        },
        {
          name: 'Zerya',
          surname: 'Betül',
          email: 'zeryabaran@gmail.com',
          organization: 'McDonaldsAussie',
          number: '91230767'
        }
      ],
      columns: [
        {
          title: 'First Name',
          field: 'name',
          cellStyle: { width: '150px' },
          editComponent: props => (
            <TextField
              value={this.state.name ? this.state.name : ''}
              disabled
            />
          )
        },
        {
          title: 'Last Name',
          field: 'surname',
          cellStyle: { width: '130px' },
          editComponent: props => (
            <TextField
              value={this.state.surname ? this.state.surname : ''}
              disabled
            />
          )
        },
        {
          title: 'Email',
          field: 'email',
          editComponent: props => (
            <AutoCompleteField
              style={{ width: 600 }}
              onChange={this.onEmailSelect}
              options={this.state.allUsers}
            />
          )
        },
        {
          title: 'Organization',
          field: 'organization',
          cellStyle: { width: '150px' },
          editComponent: props => (
            <TextField
              value={this.state.organization ? this.state.organization : ''}
              disabled
            />
          )
        },
        {
          title: 'Phone Number',
          field: 'number',
          type: 'numeric',
          cellStyle: { width: '150px' },
          editComponent: props => (
            <TextField
              value={this.state.phone ? this.state.phone : ''}
              disabled
            />
          )
        }
      ],
      allUsers: [
        {
          name: 'Mehmet',
          surname: 'Baran',
          email: 'mehmet@gmail.com',
          organization: 'McDonaldsSG',
          number: '91234567'
        },
        {
          name: 'Zerya',
          surname: 'Betül',
          email: 'zeryabaran@gmail.com',
          organization: 'McDonaldsAussie',
          number: '91230767'
        },
        {
          name: 'Meng Siong',
          surname: 'Ang',
          email: 'msang@gmail.com',
          organization: 'RMS',
          number: '91214767'
        },
        {
          name: 'Winny',
          surname: 'Daud',
          email: 'winnydaud@gmail.com',
          organization: 'RMS',
          number: '89230767'
        },
        {
          name: 'Hua Bing',
          surname: 'Yong',
          email: 'hbyong@gmail.com',
          organization: 'RMS',
          number: '81260767'
        },
        {
          name: 'James',
          surname: 'Tan',
          email: 'jamestan@gmail.com',
          organization: 'BurgerKingUSA',
          number: '90876541767'
        }
      ],
      selectedRowId: '',
      success: false,
      name: '',
      email: '',
      surname: '',
      organization: '',
      phone: ''
    };
  }

  onNameSelect = e => {
    this.setState({ name: e.target.value });
  };

  onEmailSelect = opt => {
    if (opt) {
      this.setState({
        name: opt.name,
        surname: opt.surname,
        email: opt.email,
        phone: opt.number,
        organization: opt.organization
      });
    } else {
      this.setState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        organization: ''
      });
    }
  };

  onClick = e => {
    console.log('upload');
    this.setState({ displayUploadForm: true });
  };

  handleCloseSnackbar = () => {
    this.setState({
      success: false
    });
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleCloseDataUploadForm = () => {
    this.setState({ displayUploadForm: false, selectedDataset: '' });
  };

  handleUploadSuccess = () => {
    this.setState({ uploadSuccess: true });
  };

  handleNoFile = () => {
    this.setState({ noFileError: true });
  };

  handleWrongType = () => {
    this.setState({ wrongTypeError: true });
  };

  render() {
    return (
      <div>
        <Box m={2}>
          <Typography variant="h6">Project Members Management</Typography>
          <Typography variant="subtitle1">
            You can view and manage the users in this project here
          </Typography>
        </Box>

        <br />
        <MaterialTable
          title="Datasets"
          columns={this.state.columns}
          data={this.state.usersList}
          icons={tableIcons}
          onRowClick={(evt, selectedRow) =>
            this.setState({ selectedRowId: selectedRow.tableData.id })
          }
          options={{
            filtering: true,
            exportButton: true,
            actionsColumnIndex: -1,
            rowStyle: rowData => ({
              backgroundColor:
                this.state.selectedRowId === rowData.tableData.id
                  ? '#EEE'
                  : '#FFF'
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
                    name: this.state.name,
                    surname: this.state.surname,
                    email: this.state.email,
                    organization: this.state.organization,
                    number: this.state.phone
                  };

                  let repeatedUser = false;

                  for (let i = 0; i < this.state.usersList.length; i++) {
                    if (obj.email == this.state.usersList[i].email) {
                      repeatedUser = true;
                      break;
                    }
                  }
                  if (repeatedUser) {
                    alert('This user is already in the project!');
                  } else {
                    const dataUpdate = this.state.usersList;
                    console.log(obj.email == this.state.usersList[0].email);
                    dataUpdate.push(obj);
                    this.setState({ usersList: dataUpdate, success: true });
                    //   API CALL UPDATE DATABASE
                  }
                  resolve();
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = this.state.usersList;
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  this.setState({
                    usersList: dataDelete
                  });
                  //   API CALL UPDATE DATABASE
                  resolve();
                }, 1000);
              })
          }}
        />
        <Snackbar
          open={this.state.success}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity="success">
            New user added for the project!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default UserControlTab;
