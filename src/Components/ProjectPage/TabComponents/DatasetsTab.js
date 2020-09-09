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
import CostSetUploadForm from '../CostSetUploadForm';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const styles = theme => ({
  root: {},
  uploaded: {
    color: 'green',
    marginLeft: '10px',
    marginRight: '50px'
  },
  empty: {
    color: 'red',
    marginLeft: '10px',
    marginRight: '50px'
  },
  delete: {
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: '#c82333',
      borderColor: '#bd2130',
      color: 'white'
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
});

class DatasetsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetsList: [],
      costFileStatusLoaded: false,
      costFileUploaded: null,
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
      displayCostSetUploadForm: false,
      uploadSuccess: false,
      costFileUploadSuccess: false,
      noFileError: false,
      wrongTypeError: false,
      error: false,
      errorMessage: '',
      dataloading: true
    };
  }

  componentDidMount() {
    let data = { project: this.props.projectId };
    axios
      .get('http://localhost:8000/portal/datablocks', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        },
        params: data
      })
      .then(res => {
        this.setState({ datasetsList: res.data });
        return axios.get(
          `http://localhost:8000/portal/projects/${this.props.projectId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Token ${token}`
            }
          }
        );
      })
      .then(res => {
        this.setState(
          {
            costFileStatusLoaded: true,
            costFileUploaded: res.data.cost_sheet
          },
          () => this.setState({ dataloading: false })
        );
      });
  }

  handleCloseSnackbar = () => {
    this.setState({
      success: false,
      uploadSuccess: false,
      costFileUploadSuccess: false,
      noFileError: false,
      wrongTypeError: false,
      error: false
    });
  };

  handleCloseDataUploadForm = () => {
    this.setState({
      displayUploadForm: false
    });
  };

  handleCloseCostSetUploadForm = () => {
    this.setState({
      displayCostSetUploadForm: false
    });
  };

  handleUploadSuccess = form => {
    this.setState({ uploadSuccess: true });
    let datasets = this.state.datasetsList;
    datasets.push(form);

    this.setState({ datasetsList: datasets });
    axios
      .get(`http://localhost:8000/portal/projects/${this.props.projectId}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        this.setState({ costFileUploaded: res.data.cost_sheet });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCostUploadSuccess = form => {
    this.setState({ costFileUploadSuccess: true });

    axios
      .get(`http://localhost:8000/portal/projects/${this.props.projectId}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        this.setState({ costFileUploaded: res.data.cost_sheet });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleUploadFail = err => {
    if (typeof err.data.detail != 'undefined') {
      this.setState({
        errorMessage: err.data.detail
      });
    }
    this.setState({
      error: true
    });
  };

  handleNoFile = () => {
    this.setState({ noFileError: true });
  };

  handleOpenModal = () => {
    this.setState({
      displayUploadForm: true
    });
  };

  handleOpenCostModal = () => {
    this.setState({
      displayCostSetUploadForm: true
    });
  };

  handleDeleteOpen = () => {
    this.setState({ deleteOpen: true });
  };

  handleDeleteClose = () => {
    this.setState({ deleteOpen: false });
  };

  deleteCostFile = () => {
    axios
      .delete(
        `http://localhost:8000/portal/projects/${this.props.projectId}/items/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`
          }
        }
      )
      .then(res => {
        this.handleDeleteClose();
        return axios.get(
          `http://localhost:8000/portal/projects/${this.props.projectId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Token ${token}`
            }
          }
        );
      })
      .then(res => {
        this.setState({
          costFileUploaded: res.data.cost_sheet
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderCostButtons = () => {
    const { classes } = this.props;

    if (this.state.costFileStatusLoaded) {
      return (
        <Box display="flex" alignItems="center">
          <Typography variant="h6">Upload Status:</Typography>
          <Typography
            className={
              this.state.costFileUploaded ? classes.uploaded : classes.empty
            }
            variant="h6"
          >
            {this.state.costFileUploaded ? 'AVAILABLE' : 'UNAVAILABLE'}
          </Typography>
          {this.state.costFileUploaded ? (
            <Button
              onClick={this.handleDeleteOpen}
              variant="contained"
              className={classes.delete}
            >
              Delete
            </Button>
          ) : (
            <Button
              onClick={this.handleOpenCostModal}
              variant="contained"
              color="primary"
            >
              Upload Cost Set
            </Button>
          )}
        </Box>
      );
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Box
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
        <Box mt={5} px={1}>
          <Box>
            <Typography variant="h6">Cost Dataset</Typography>
            <Typography variant="subtitle1">
              The cost dataset will be used for optimisation and mapping of item
              codes to item names
            </Typography>
          </Box>
          <Box boxShadow={3} mt={2} px={5} py={5} className={classes.root}>
            {this.renderCostButtons()}
          </Box>
        </Box>
        <DataUploadForm
          handleCloseDataUploadForm={this.handleCloseDataUploadForm}
          displayDataUploadForm={this.state.displayUploadForm}
          successUpload={this.handleUploadSuccess}
          noFileSelected={this.handleNoFile}
          projectId={this.props.projectId}
          handleUploadFail={this.handleUploadFail}
        />
        <CostSetUploadForm
          handleCloseDataUploadForm={this.handleCloseCostSetUploadForm}
          displayDataUploadForm={this.state.displayCostSetUploadForm}
          successUpload={this.handleCostUploadSuccess}
          noFileSelected={this.handleNoFile}
          projectId={this.props.projectId}
          handleUploadFail={this.handleUploadFail}
        />
        <Dialog open={this.state.deleteOpen} onClose={this.handleDeleteClose}>
          <DialogTitle>
            {'Are you sure you want to delete this cost file?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The cost file and its associated item mappings will be permanently
              deleted
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteClose} color="primary">
              No
            </Button>
            <Button onClick={this.deleteCostFile} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
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
          open={this.state.costFileUploadSuccess}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity="success">
            Data validation passed! New Cost Set uploaded successfully!
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
            {this.state.errorMessage !== ''
              ? this.state.errorMessage + '. '
              : 'An error has occured! '}
            Please try again.
          </Alert>
        </Snackbar>
        <Backdrop className={classes.backdrop} open={this.state.dataloading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DatasetsTab);
