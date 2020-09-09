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
class ConstraintSetDetailsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowId: '',
      columns: [
        { title: 'Constraint', field: 'name' },
        { title: 'Category', field: 'category' },
        { title: 'Item No. Equation', field: 'equation' },
        { title: 'Item Name Equation', field: 'equation_name' },
        { title: 'Type', field: 'type' },
        { title: 'Penalty', field: 'penalty' }
      ],
      unprocessedData: [],
      data: [],
      successDelete: false,
      error: false
    };

    this.handleCloseDeleteSnackbar = this.handleCloseDeleteSnackbar.bind(this);
    this.handleCloseErrorSnackbar = this.handleCloseErrorSnackbar.bind(this);
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
      .get(`http://localhost:8000/portal/constraints/`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        },
        params: { constraint_block: this.props.constraintSetID }
      })
      .then(res => {
        this.setState({
          unprocessedData: res.data
        });
        return axios.get(`http://localhost:8000/portal/constraintcategories/`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`
          }
        });
      })
      .then(res => {
        var categories = {};
        res.data.forEach(categorydict => {
          categories[categorydict.id] = categorydict.name;
        });
        var processedData = this.state.unprocessedData;
        processedData.forEach(constraint => {
          constraint.category = categories[constraint.category];
          if (constraint.penalty === '-1') {
            constraint.type = 'Hard';
            constraint.penalty = 'NA';
          } else {
            constraint.type = 'Soft';
          }
        });
        this.setState({
          data: processedData
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <MaterialTable
          title=""
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
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  axios
                    .delete(
                      `http://localhost:8000/portal/constraints/${oldData.id}`,
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
                        const dataDelete = [...this.state.data];
                        const index = oldData.tableData.id;
                        dataDelete.splice(index, 1);
                        this.setState({
                          data: [...dataDelete],
                          successDelete: true
                        });
                      }
                    })
                    .catch(err => {
                      this.setState({ error: true });
                    });
                  resolve();
                }, 1000);
              })
          }}
        />
        <Snackbar
          open={this.state.successDelete}
          autoHideDuration={6000}
          onClose={this.handleCloseDeleteSnackbar}
        >
          <Alert onClose={this.handleCloseDeleteSnackbar} severity="success">
            Constraint deleted successfully!
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

export default ConstraintSetDetailsTable;
