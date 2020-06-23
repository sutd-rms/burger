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
import DataUploadForm from './DataUploadForm';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

class ProjectDatasets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetsList: [
        {
          name: 'Sample dataset from McDonald 2017',
          date: '24/12/2020, 10:02:34'
        },
        {
          name: 'Sample dataset from McDonald 2018',
          date: '05/10/2020, 15:32:50'
        },
        {
          name: 'Sample dataset from McDonald 2019',
          date: '20/04/2020, 9:23:47'
        },
        {
          name: 'Sample dataset from McDonald 2020',
          date: '14/12/2020, 12:40:12'
        }
      ],
      columns: [
        {
          title: 'Dataset Name',
          field: 'name',
          filtering: false,
          editComponent: props => (
            <Input
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
              fullWidth
            />
          )
        },
        {
          title: 'Created Date',
          field: 'date',
          filtering: false,
          editable: false
        }
      ],
      selectedRowId: '',
      success: false,
      displayUploadForm: false,
      uploadSuccess: false,
      selectedDataset: '',
      createNew: false
    };
  }

  onClick = e => {
    console.log('upload');
    this.setState({ displayUploadForm: true });
  };

  handleCloseSnackbar = () => {
    this.setState({
      success: false,
      createNew: false,
      uploadSuccess: false
    });
  };

  handleCloseDataUploadForm = () => {
    this.setState({ displayUploadForm: false, selectedDataset: '' });
  };

  handleUploadSuccess = () => {
    this.setState({ uploadSuccess: true });
  };

  render() {
    return (
      <div>
        <Typography variant="h6">Datasets Management</Typography>
        <Typography variant="subtitle1">
          You can view and manage the datasets uploaded before, or create a new
          dataset by uploading csv files
        </Typography>
        <Box m={2}>
          {/* <Typography variant="subtitle1">
            -- Navigate all uploaded datasets
          </Typography>
          <Typography variant="subtitle1">-- Create new datasets</Typography>
          <Typography variant="subtitle1">-- Edit dataset name</Typography>
          <Typography variant="subtitle1">
            -- Modify the dataset source file
          </Typography> */}
        </Box>

        <br />
        <MaterialTable
          title="Datasets"
          columns={this.state.columns}
          data={this.state.datasetsList}
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
          actions={[
            {
              icon: () => <BackupOutlinedIcon />,
              tooltip: 'Upload data file',
              onClick: (event, rowData) => {
                console.log('upload');
                this.setState({
                  displayUploadForm: true,
                  selectedDataset: rowData.name
                });
                // alert('You are uploading to ' + rowData.name)
              }
            }
          ]}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  console.log(newData);
                  let date = new Date();
                  let newList = this.state.datasetsList;
                  newList.push({
                    name: newData.name,
                    date:
                      date.getDate() +
                      '/' +
                      date.getMonth() +
                      '/' +
                      date.getFullYear() +
                      ', ' +
                      date.getHours() +
                      ':' +
                      date.getMinutes() +
                      ':' +
                      date.getSeconds()
                  });
                  this.setState({
                    datasetsList: newList,
                    displayUploadForm: true,
                    selectedDataset: newData.name,
                    createNew: true
                  });
                }, 600);
              })
          }}
        />
        <DataUploadForm
          handleCloseDataUploadForm={this.handleCloseDataUploadForm}
          displayDataUploadForm={this.state.displayUploadForm}
          successUpload={this.handleUploadSuccess}
          selectedDataset={this.state.selectedDataset}
        />
        <Snackbar
          open={this.state.uploadSuccess}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity="success">
            {this.state.createNew
              ? 'New dataset created successfully!'
              : 'Data source file uploaded successfully!'}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default ProjectDatasets;
