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
import DataUploadForm from '../DataUploadForm';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import axios from 'axios';
import AssessmentIcon from '@material-ui/icons/Assessment';
import history from './../../../history';

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

class DatasetsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetsList: [],
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
        }
        // {
        //   title: 'Created Date',
        //   field: 'date',
        //   filtering: false,
        //   editable: false
        // }
      ],
      selectedRowId: '',
      success: false,
      displayUploadForm: false,
      uploadSuccess: false,
      // selectedDataset: '',
      // createNew: false,
      noFileError: false,
      wrongTypeError: false,
      error: false,
      waitFoUpload: false
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    let data = { project: this.props.projectId };
    axios
      .get('https://secret-sauce.azurewebsites.net/portal/datablocks', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        },
        params: data
      })
      .then(res => {
        this.setState({ datasetsList: res.data });
      });
  }

  onClick = e => {
    this.setState({ displayUploadForm: true });
  };

  handleCloseSnackbar = () => {
    this.setState({
      success: false,
      uploadSuccess: false,
      noFileError: false,
      wrongTypeError: false,
      error: false
    });
  };

  handleCloseDataUploadForm = () => {
    this.setState({
      displayUploadForm: false,
      waitFoUpload: false
    });
  };

  handleUploadSuccess = form => {
    this.setState({ uploadSuccess: true });
    let datasets = this.state.datasetsList;
    datasets.push(form);
    this.setState({ datasetsList: datasets });
  };
  handleUploadFail = () => {
    this.setState({ error: true });
  };

  handleNoFile = () => {
    this.setState({ noFileError: true });
  };

  handleWrongType = () => {
    this.setState({ wrongTypeError: true });
  };

  handleOpenModal = () => {
    this.setState({
      displayUploadForm: true,
    });
  };

  render() {
    return (
      <div>
        <Box
          mb={5}
          px={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h6">Datasets Management</Typography>
            <Typography variant="subtitle1">
              You can view and manage the datasets uploaded before, or create a
              new dataset by uploading csv files
            </Typography>
          </Box>
          <Box>
            <Button variant="outlined" onClick={this.handleOpenModal}>
              Upload New Dataset
            </Button>
          </Box>
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
              icon: () => <GetAppRoundedIcon />,
              tooltip: 'Download data file',
              onClick: (event, rowData) => {
                const rowIndex = rowData.tableData.id;
                const downloadLink = this.state.datasetsList[rowIndex].upload;
                window.open(downloadLink);
              }
            },
            {
              icon: () => <AssessmentIcon />,
              tooltip: 'Data Visualisation',
              onClick: (event, rowData) => {
                const rowIndex = rowData.tableData.id;
                const datasetId = this.state.datasetsList[rowIndex].id;
                window.open(`dataset/${datasetId}`);
              }
            }
          ]}
        />
        <DataUploadForm
          handleCloseDataUploadForm={this.handleCloseDataUploadForm}
          displayDataUploadForm={this.state.displayUploadForm}
          successUpload={this.handleUploadSuccess}
          noFileSelected={this.handleNoFile}
          handleWrongType={this.handleWrongType}
          projectId={this.props.projectId}
          handleUploadFail={this.handleUploadFail}
        />
        <Snackbar
          open={this.state.uploadSuccess}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity="success">
          Data validation passed! New dataset created successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.noFileError}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity="error">
            No file selected. Please try again.
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.wrongTypeError}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity="warning">
            Unexpected columns in the CSV file. Please try again.
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.error}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity="error">
            An error has occured! Please try again.
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default DatasetsTab;
