import React, { useEffect, useState } from 'react';
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
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

function AutoCompleteField(props) {
  const [inputValue, setInputValue] = useState(props.value);

  let onInputChange = (evt, newInput) => {
    setInputValue(newInput);
  };

  let onChange = (evt, newValue) => {
    props.onChange(newValue);
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      onChange={onChange}
      onInputChange={onInputChange}
      inputValue={inputValue}
      options={props.options}
      getOptionLabel={option => option.name}
      renderOption={option => <React.Fragment>{option.name}</React.Fragment>}
      renderInput={params => (
        <TextField
          {...params}
          label="Choose a company"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: '' // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UsersTable(props) {
  const token = localStorage.getItem('token');
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');

  const handleCloseSnackbar = e => {
    setError(false);
  };

  const [state, setState] = React.useState({
    columns: [
      { title: 'First Name', field: 'first_name' },
      { title: 'Last Name', field: 'last_name' },
      { title: 'Email', field: 'email' },
      {
        title: 'Organization',
        field: 'company',
        editComponent: props => (
          <AutoCompleteField onChange={onCompanySelect} options={companyList} />
        )
      },
      { title: 'Phone Number', field: 'phone', type: 'numeric' },
      {
        title: 'Last Login',
        field: 'last_login',
        type: 'datetime',
        filtering: false,
        editable: false
      },
      { title: 'Staff', field: 'is_staff', type: 'boolean' },
      {
        title: 'Active Status',
        field: 'is_active',
        type: 'boolean',
        editable: false
      }
    ],
    data: props.data
  });
  const [companyList, setCompanyList] = useState([]);
  const [error, setError] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);

  const onCompanySelect = opt => {
    if (opt) {
      setSelectedCompanyId(opt.id);
      // setOrganization(getCompanyName(opt.company));
      // setUid(opt.id);
    } else {
      setSelectedCompanyId('');
      // setOrganization('');
      // setUid('');
    }
  };

  useEffect(() => {
    axios
      .get('https://secret-sauce.azurewebsites.net/auth/company/', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(data => setCompanyList(data.data));
  }, [token]);

  useEffect(() => {
    setState({
      columns: [
        { title: 'First Name', field: 'first_name' },
        { title: 'Last Name', field: 'last_name' },
        { title: 'Email', field: 'email' },
        {
          title: 'Organization',
          field: 'company',
          editable: false,
          editComponent: props => (
            <AutoCompleteField
              onChange={onCompanySelect}
              options={companyList}
            />
          )
        },
        { title: 'Phone Number', field: 'phone', type: 'numeric' },
        {
          title: 'Last Login',
          field: 'last_login',
          type: 'datetime',
          filtering: false,
          editable: false
        },
        { title: 'Staff', field: 'is_staff', type: 'boolean' },
        {
          title: 'Active Status',
          field: 'is_active',
          type: 'boolean'
        }
      ],
      data: props.data
    });
    // FETCH & SET STATE
    axios
      .get('https://secret-sauce.azurewebsites.net/auth/users', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        let convertedUsersList = [];
        res.data.map(user => {
          user.company = user.company.name;
          convertedUsersList.push(user);
        });
        setState(prevState => {
          const data = convertedUsersList;
          return { ...prevState, data };
        });
      });
  }, [companyList, props.data, token]);

  return (
    <div>
      <MaterialTable
        title=""
        columns={state.columns}
        data={state.data}
        icons={tableIcons}
        onRowClick={(evt, selectedRow) => {
          setSelectedRow(selectedRow.tableData.id);
          setSelectedCompanyId(selectedRow.company);
        }}
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
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                let newPatchData = {
                  first_name: newData.first_name,
                  last_name: newData.last_name,
                  phone: newData.phone,
                  is_staff: newData.is_staff,
                  is_superuser: newData.is_staff,
                  email: newData.email,
                  is_active: newData.is_active
                };
                axios
                  .patch(
                    `https://secret-sauce.azurewebsites.net/auth/users/${oldData.id}/`,
                    newPatchData,
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
                      if (oldData) {
                        setState(prevState => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                        setSuccessEdit(true);
                      }
                      resolve();
                    } else {
                      setError(true);
                      resolve();
                    }
                  });
              }, 600);
            })
        }}
      />
      <Snackbar
        open={successEdit}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          User information edited successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          An error occured! Please try again!
        </Alert>
      </Snackbar>
    </div>
  );
}
