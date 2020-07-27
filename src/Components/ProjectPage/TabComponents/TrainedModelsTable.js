import React from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import { withStyles } from '@material-ui/core/styles';
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
import ShowChartIcon from '@material-ui/icons/ShowChart';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import FileDownload from 'js-file-download';
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
  root: {}
});

const token = localStorage.getItem('token');
class TrainedModelsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowId: '',
      columns: [
        { title: 'Name', field: 'name' },
        { title: 'Dataset', field: 'datasetName' },
        { title: 'Model', field: 'model' },
        { title: 'Training Status', field: 'trainingStatus' },
        { title: 'Cross Validation Status', field: 'cvStatus' },
        {
          title: 'Date Trained',
          field: 'created',
          type: 'datetime',
          filtering: false
        }
      ],
      data: []
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('token');

    axios
      .get(`https://secret-sauce.azurewebsites.net/portal/trainedmodels`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${token}`
        },
        params: { project: this.props.projectId }
      })
      .then(res => {
        var tableData = [];

        res.data.forEach(trainedModel => {
          tableData.push({
            id: trainedModel.id,
            cvProgress: trainedModel.cv_progress,
            name: trainedModel.name,
            datasetName: trainedModel.data_block.name,
            model: trainedModel.prediction_model.name,
            trainingStatus:
              trainedModel.pct_complete == 100
                ? 'Completed'
                : trainedModel.pct_complete + '%',
            cvStatus:
              trainedModel.cv_progress == 100
                ? 'Completed'
                : trainedModel.cv_progress + '%',
            created: trainedModel.created
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
          title="Trained Models"
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
              backgroundColor: '#F5A705',
              color: '#FFF'
            }
          }}
          actions={[
            rowData => ({
              icon: () => <ShowChartIcon />,
              tooltip: 'Download Elasticities',
              hidden: rowData.cvStatus != 'Completed',
              onClick: (event, rowData) => {
                const rowIndex = rowData.tableData.id;
                const downloadLink = this.state.datasetsList[rowIndex].upload;
                // window.open(downloadLink);
              }
            }),
            rowData => ({
              icon: () => <GraphicEqIcon />,
              tooltip: 'Download Feature Importance Sheet',
              hidden: rowData.cvStatus != 'Completed',
              onClick: (event, rowData) => {
                axios
                  .get(
                    `https://secret-sauce.azurewebsites.net/portal/trainedmodels/${rowData.id}/feature_importance/`,
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Token ${token}`
                      }
                    }
                  )
                  .then(res => {
                    FileDownload(res.data, 'feature_importances.csv');
                  });
              }
            })
          ]}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TrainedModelsTable);
