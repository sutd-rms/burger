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

export default function OptimisationTable() {
  const [selectedRow, setSelectedRow] = React.useState(null);

  const [state, setState] = React.useState({
    columns: [
      { title: 'Trained Model', field: 'model' },
      { title: 'Constraint Set', field: 'constraintSet' },
      { title: 'Cost Set', field: 'costSet' },
      { title: 'Data Set', field: 'dataSet' },
      {
        title: 'Date Run',
        field: 'dateRun',
        type: 'datetime',
        filtering: false
      }
    ],
    data: [
      {
        model: 'Test Model',
        constraintSet: 'Sample Constraint 1',
        costSet: 'Sample costset from McDonald 2017',
        dataSet: 'Sample dataset from McDonald 2017',
        dateRun: '2019-12-20 08:30:45.687'
      },
      {
        model: 'Test Model 2',
        constraintSet: 'Sample Constraint 1',
        costSet: 'Sample costset from McDonald 2018',
        dataSet: 'Sample dataset from McDonald 2018',
        dateRun: '2020-02-20 10:20:46.657'
      },
      {
        model: 'Test Model2',
        constraintSet: 'McDonalds Aussie',
        costSet: 'Sample costset from McDonald 2019',
        dataSet: 'Sample dataset from McDonald 2019',
        dateRun: '2020-05-20 20:30:46.657'
      },
      {
        model: 'ABC Test',
        constraintSet: 'Sample Constraint 2',
        costSet: 'Sample costset from McDonald 2017',
        dataSet: 'Sample dataset from McDonald 2018',
        dateRun: '2020-06-01 20:46:46.657'
      }
    ]
  });

  return (
    <div>
      <MaterialTable
        title="Past Optimisations"
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
            backgroundColor: 'brown',
            color: '#FFF'
          }
        }}
      />
    </div>
  );
}
