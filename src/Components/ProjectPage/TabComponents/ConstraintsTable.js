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
import PageviewIcon from '@material-ui/icons/Pageview';
import ConstraintModal from './ConstraintModal';

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

class ConstraintsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowId: '',
      open: false,
      columns: [
        { title: 'Name', field: 'name' },
        {
          title: 'Date Created',
          field: 'dateCreated',
          type: 'datetime',
          filtering: false
        }
      ],
      data: [
        {
          name: 'Sample Constraint 1',
          dateCreated: '2019-12-20 08:30:45.687'
        },
        {
          name: 'Testing Constraints',
          dateCreated: '2020-02-20 10:20:46.657'
        },
        {
          name: 'McDonalds Aussie',
          dateCreated: '2020-05-20 20:30:46.657'
        },
        {
          name: 'Sample Constraint 2',
          dateCreated: '2020-06-01 20:46:46.657'
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <MaterialTable
          title="Constraint Sets"
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
          actions={[
            {
              icon: () => <PageviewIcon />,
              tooltip: 'View or Edit Constraint Set',
              onClick: (event, rowData) => {
                this.setState({
                  open: true
                });
              }
            }
          ]}
        />
        <ConstraintModal
          open={this.state.open}
          handleClose={this.handleCloseConstraintModal}
          showAlert={this.showConstraintAlert}
        />
      </div>
    );
  }
}

export default ConstraintsTable;
