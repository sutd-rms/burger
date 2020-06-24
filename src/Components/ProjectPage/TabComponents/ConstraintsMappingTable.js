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

export default function ConstraintsMappingTable() {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleCloseSnackbar = e => {
    setSuccess(false);
  };

  const [state, setState] = React.useState({
    columns: [
      { title: 'Item', field: 'item' },
      { title: 'Variable', field: 'variable' }
    ],
    data: [
      {
        item: 'Fillet-o-Fish',
        variable: 'X1'
      },
      {
        item: 'McChicken',
        variable: 'X2'
      },
      {
        item: 'FriesS',
        variable: 'X3'
      },
      {
        item: 'FriesM',
        variable: 'X4'
      },
      {
        item: 'FriesL',
        variable: 'X5'
      },
      {
        item: 'McWings',
        variable: 'X6'
      },
      {
        item: 'McFlurry',
        variable: 'X7'
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
          maxBodyHeight: 300,
          actionsColumnIndex: -1,
          paging: false,
          rowStyle: rowData => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? '#EEE' : '#FFF'
          }),
          headerStyle: {
            backgroundColor: 'grey',
            color: '#FFF'
          }
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
