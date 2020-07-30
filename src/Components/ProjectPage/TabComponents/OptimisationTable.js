import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import RefreshIcon from '@material-ui/icons/Refresh';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
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

const styles = theme => ({
  root: {},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
});

const token = localStorage.getItem('token');

class OptimisationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowId: '',
      columns: [
        { title: 'Model', field: 'model' },
        { title: 'Constraint Set', field: 'constraintSetName' },
        { title: 'Max Epoch', field: 'maxEpoch' },
        { title: 'Population', field: 'population' },
        { title: 'Status', field: 'status' },
        {
          title: 'Date Run',
          field: 'created',
          type: 'datetime',
          filtering: false
        }
      ],
      data: []
    };
  }

  componentDidMount() {
    axios
      .get(`https://secret-sauce.azurewebsites.net/portal/optimizers`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        },
        params: { project: this.props.projectId }
      })
      .then(res => {
        var tableData = [];

        res.data.forEach(optimisation => {
          tableData.push({
            id: optimisation.id,
            model: optimisation.trained_model.name,
            modelId: optimisation.trained_model.id,
            constraintSetName: optimisation.constraint_block.name,
            constraintSetId: optimisation.constraint_block.id,
            maxEpoch: optimisation.max_epoch,
            population: optimisation.population,
            created: optimisation.created,
            results: optimisation.results,
            status: optimisation.results != null ? 'Completed' : 'Pending'
          });
        });
        this.setState({
          data: tableData
        });
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <MaterialTable
          title="Past Optimisations"
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
              backgroundColor: 'brown',
              color: '#FFF'
            }
          }}
          actions={[
            rowData => ({
              icon: () => <RefreshIcon />,
              tooltip: 'Refresh Status',
              disabled: rowData.results,
              onClick: (event, rowData) => {
                axios
                  .get(
                    `https://secret-sauce.azurewebsites.net/portal/optimizers/${rowData.id}`,
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Token ${token}`
                      }
                    }
                  )
                  .then(res => {
                    rowData.results = res.data.results;
                    var newData = this.state.data;
                    this.setState({ data: newData });
                  });
              }
            }),
            rowData => ({
              icon: () => <InsertDriveFileIcon />,
              tooltip: 'Download Report',
              disabled: !rowData.results,
              onClick: (event, rowData) => {
                window.open(rowData.results);
              }
            })
          ]}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(OptimisationTable);
