import React from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
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

export default function UsersTable() {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleCloseSnackbar = e => {
    setSuccess(false);
  };

  const [state, setState] = React.useState({
    columns: [
      { title: 'First Name', field: 'name' },
      { title: 'Last Name', field: 'surname' },
      { title: 'Email', field: 'email' },
      { title: 'Organization', field: 'organization' },
      { title: 'Phone Number', field: 'number', type: 'numeric' },
      {
        title: 'Last Login',
        field: 'login',
        type: 'datetime',
        filtering: false
      },
      { title: 'Staff', field: 'staff', type: 'boolean' },
      { title: 'Active Status', field: 'status', type: 'boolean' }
    ],
    data: [
      {
        name: 'Mehmet',
        surname: 'Baran',
        email: 'mehmet@gmail.com',
        organization: 'McDonaldsSG',
        number: '91234567',
        login: '2019-12-20 08:30:45.687',
        staff: false,
        status: true
      },
      {
        name: 'Zerya',
        surname: 'Betül',
        email: 'zeryabaran@gmail.com',
        organization: 'McDonaldsAussie',
        number: '91230767',
        login: '2020-02-20 10:20:46.657',
        staff: false,
        status: false
      },
      {
        name: 'Meng Siong',
        surname: 'Ang',
        email: 'msang@gmail.com',
        organization: 'RMS',
        number: '91214767',
        login: '2020-05-20 20:30:46.657',
        staff: true,
        status: true
      },
      {
        name: 'Winny',
        surname: 'Daud',
        email: 'winnydaud@gmail.com',
        organization: 'RMS',
        number: '89230767',
        login: '2020-06-01 20:46:46.657',
        staff: true,
        status: true
      },
      {
        name: 'Hua Bing',
        surname: 'Yong',
        email: 'hbyong@gmail.com',
        organization: 'RMS',
        number: '81260767',
        login: '2017-06-01 20:46:46.657',
        staff: true,
        status: false
      },
      {
        name: 'James',
        surname: 'Tan',
        email: 'jamestan@gmail.com',
        organization: 'BurgerKingUSA',
        number: '90876541767',
        login: '2020-04-01 20:46:46.657',
        staff: false,
        status: true
      }
    ]
  });

  return (
    <div>
      <MaterialTable
        title=""
        columns={state.columns}
        data={state.data}
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
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
                setSuccess(true);
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            })
        }}
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
    </div>
  );
}
