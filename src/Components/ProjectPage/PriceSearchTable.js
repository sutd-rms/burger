import React from 'react';
import { forwardRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import Typography from '@material-ui/core/Typography';
import FloatingAddButton from '../FloatingAddButton';
import NewDemandPredictionForm from './NewDemandPredictionForm';
import DashboardTopNav from './../DashboardTopNav';

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

export default function PriceSearchTable(props) {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [displayDialog, setDisplayDialog] = useState(false);

  const handleCloseSnackbar = e => {
    setSuccess(false);
  };

  const [state, setState] = React.useState({
    columns: [
      { title: 'Model in Use', field: 'model' },
      { title: 'Training set', field: 'trainset' },
      { title: 'Item Name', field: 'item' },
      { title: 'Item Price', field: 'price' },
      { title: 'Predicted Demand', field: 'demand', type: 'numeric' }
    ],
    data: [
      {
        model: 'GA',
        trainset: 'McDonald 2018 Autumn',
        item: 'Big Mc',
        price: '$4.75',
        demand: '123'
      },
      {
        model: 'MCMC',
        trainset: 'McDonald 2018 Summer',
        item: 'Nuggets',
        price: '$3.05',
        demand: '223'
      },
      {
        model: 'MCMC',
        trainset: 'McDonald 2019 Winter',
        item: 'Mid-Fries',
        price: '$2.75',
        demand: '435'
      },
      {
        model: 'XDB Regressor',
        trainset: 'McDonald US 2019',
        item: 'Apple Pie',
        price: '$1.65',
        demand: '96'
      },
      {
        model: 'Machine Learning',
        trainset: 'McDonald 2018 SG',
        item: 'Oreo Frabcinno',
        price: '$4.75',
        demand: '179'
      },
      {
        model: 'Deep Learning',
        trainset: 'McDonald 2020 Spring',
        item: 'Mc Wings',
        price: '$5.75',
        demand: '281'
      }
    ]
  });

  let handleAdd = () => {
    setDisplayDialog(true);
  };

  let handleClose = () => {
    setDisplayDialog(false);
  };
  return (
    <div className={classes.root}>
      <DashboardTopNav title={'Demand Prediction: ' + props.title} />

      <MaterialTable
        title=""
        columns={state.columns}
        data={state.data}
        icons={tableIcons}
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        options={{
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
      />
      <FloatingAddButton onClick={handleAdd} />
      <NewDemandPredictionForm open={displayDialog} handleClose={handleClose} />
      {/* <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          New User created! An invite will be sent out shortly!
        </Alert>
      </Snackbar> */}
    </div>
  );
}
