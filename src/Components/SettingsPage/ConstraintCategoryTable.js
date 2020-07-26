import React from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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

const token = localStorage.getItem('token');

class ConstraintCategoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowId: '',
      successAdd: false,
      successEdit: false,
      successDelete: false,
      error: false,
      columns: [{ title: 'Name', field: 'name' }],
      data: []
    };

    this.handleCloseAddSnackbar = this.handleCloseAddSnackbar.bind(this);
    this.handleCloseEditSnackbar = this.handleCloseEditSnackbar.bind(this);
    this.handleCloseDeleteSnackbar = this.handleCloseDeleteSnackbar.bind(this);
    this.handleCloseErrorSnackbar = this.handleCloseErrorSnackbar.bind(this);
  }

  handleCloseAddSnackbar(event) {
    this.setState({
      successAdd: false
    });
  }

  handleCloseEditSnackbar(event) {
    this.setState({
      successEdit: false
    });
  }

  handleCloseDeleteSnackbar(event) {
    this.setState({
      successDelete: false
    });
  }

  handleCloseErrorSnackbar(event) {
    this.setState({
      error: false
    });
  }

  componentDidMount() {
    axios
      .get(
        `https://secret-sauce.azurewebsites.net/portal/constraintcategories/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`
          }
        }
      )
      .then(res => {
        this.setState({
          data: res.data
        });
      });
  }

  render() {
    return (
      <div>
        <MaterialTable
          title="Constraint Categories"
          columns={this.state.columns}
          data={this.state.data}
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
              backgroundColor: 'grey',
              color: '#FFF'
            }
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  let form = {
                    name: newData.name
                  };
                  axios
                    .patch(
                      `https://secret-sauce.azurewebsites.net/portal/constraintcategories/${newData.id}`,
                      form,
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
                        return axios
                          .get(
                            `https://secret-sauce.azurewebsites.net/portal/constraintcategories/`,
                            {
                              headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                                Authorization: `Token ${token}`
                              }
                            }
                          )
                          .then(res => {
                            this.setState({
                              data: res.data,
                              successEdit: true
                            });
                          });
                      }
                    })
                    .catch(err => {
                      this.setState({ error: true });
                    });
                  resolve();
                }, 2000);
              }),
            onRowAdd: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  let form = {
                    name: newData.name
                  };
                  axios
                    .post(
                      `https://secret-sauce.azurewebsites.net/portal/constraintcategories/`,
                      form,
                      {
                        headers: {
                          'Content-Type': 'application/json',
                          Accept: 'application/json',
                          Authorization: `Token ${token}`
                        }
                      }
                    )
                    .then(res => {
                      if (res.status === 201) {
                        return axios
                          .get(
                            `https://secret-sauce.azurewebsites.net/portal/constraintcategories/`,
                            {
                              headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                                Authorization: `Token ${token}`
                              }
                            }
                          )
                          .then(res => {
                            this.setState({
                              data: res.data,
                              successAdd: true
                            });
                          });
                      }
                    })
                    .catch(err => {
                      this.setState({ error: true });
                    });
                  resolve();
                }, 2000);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  axios
                    .delete(
                      `https://secret-sauce.azurewebsites.net/portal/constraintcategories/${oldData.id}`,
                      {
                        headers: {
                          'Content-Type': 'application/json',
                          Accept: 'application/json',
                          Authorization: `Token ${token}`
                        }
                      }
                    )
                    .then(res => {
                      if (res.status === 204) {
                        return axios
                          .get(
                            `https://secret-sauce.azurewebsites.net/portal/constraintcategories/`,
                            {
                              headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                                Authorization: `Token ${token}`
                              }
                            }
                          )
                          .then(res => {
                            this.setState({
                              data: res.data,
                              successDelete: true
                            });
                          });
                      }
                    })
                    .catch(err => {
                      this.setState({ error: true });
                    });
                  resolve();
                }, 2000);
              })
          }}
        />
        <Snackbar
          open={this.state.successAdd}
          autoHideDuration={6000}
          onClose={this.handleCloseAddSnackbar}
        >
          <Alert onClose={this.handleCloseAddSnackbar} severity="success">
            Constraint Category added successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.successEdit}
          autoHideDuration={6000}
          onClose={this.handleCloseEditSnackbar}
        >
          <Alert onClose={this.handleCloseEditSnackbar} severity="success">
            Constraint Category edited successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.successDelete}
          autoHideDuration={6000}
          onClose={this.handleCloseDeleteSnackbar}
        >
          <Alert onClose={this.handleCloseDeleteSnackbar} severity="success">
            Constraint Category deleted successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.error}
          autoHideDuration={6000}
          onClose={this.handleCloseErrorSnackbar}
        >
          <Alert onClose={this.handleCloseErrorSnackbar} severity="error">
            An error occured! Please try again!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default ConstraintCategoryTable;
