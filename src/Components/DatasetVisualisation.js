import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import DashboardTopNav from './DashboardTopNav';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Boxplot from './../static/images/candlestick.svg';
import CardActionArea from '@material-ui/core/CardActionArea';
import Linegraph from './../static/images/growth.svg';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BoxplotChart from './Boxplot';
import LinegraphChart from './Linegraph';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const token = localStorage.getItem('token');

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing(8, 0),
    marginTop: theme.spacing(5)
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(5)
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontWeight: 'bold'
  },
  actionButtons: {
    marginTop: theme.spacing(5),
    textAlign: 'right'
  },
  submitSection: {
    marginTop: theme.spacing(5),
    textAlign: 'right'
  },
  submitButton: {
    backgroundColor: 'green',
    color: 'white'
  },
  title: {
    fontWeight: 'bold'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
});

function getSteps() {
  return ['Graph Selection', 'Item Selection', 'Graph Generation'];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

class DatasetVisualisation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      datasetList: ['random_csv_file.csv', 'iloverms.csv', 'test.csv'],
      dataset: 'random_csv_file.csv',
      constraints: '',
      items: [],
      allitems: [],
      itemMappings: {},
      selected: '',
      boxplotData: '',
      linegraphData: '',
      hasFetched: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.setBoxplot = this.setBoxplot.bind(this);
    this.setLineGraph = this.setLineGraph.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateGraph = this.generateGraph.bind(this);
    this.renderGraphs = this.renderGraphs.bind(this);
  }

  setBoxplot(event) {
    this.setState({
      selected: 'boxplot'
    });
  }

  setLineGraph(event) {
    this.setState({
      selected: 'linegraph'
    });
  }

  handleChange(event, values) {
    if (values.length > 10) {
      return;
    }
    this.setState({
      items: values
    });
  }

  handleNext(event) {
    if (this.state.activeStep === 0) {
      if (this.state.selected === '') {
        return;
      }
    }
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  }

  generateGraph(event) {
    if (this.state.items.length < 1) {
      return;
    }

    if (this.state.selected === 'boxplot') {
      var data = { items: this.state.items.join() };

      axios
        .get(
          `https://secret-sauce.azurewebsites.net/portal/datablocks/${this.props.match.params.datasetId}/vizdata/price/`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Token ${token}`
            },
            params: data
          }
        )
        .then(res => {
          var processedData = {};
          processedData.items = [];
          processedData.datasets = res.data.datasets;
          res.data.items.forEach(itemNumber => {
            processedData.items.push([this.state.itemMappings[itemNumber]]);
          });
          this.setState({ boxplotData: processedData });
          this.setState({ hasFetched: true });
        });
    }
    if (this.state.selected === 'linegraph') {
      var data = { items: this.state.items.join() };

      axios
        .get(
          `https://secret-sauce.azurewebsites.net/portal/datablocks/${this.props.match.params.datasetId}/vizdata/qty/`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Token ${token}`
            },
            params: data
          }
        )
        .then(res => {
          var processedData = {};
          processedData.weeks = res.data.weeks;
          processedData.datasets = {};
          Object.keys(res.data.datasets).forEach(itemkey => {
            processedData.datasets[this.state.itemMappings[itemkey]] =
              res.data.datasets[itemkey];
          });
          this.setState({ linegraphData: processedData });
          this.setState({ hasFetched: true });
        });
    }

    this.setState({
      activeStep: this.state.activeStep + 1
    });
  }

  handleBack(event) {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  }

  handleReset(event) {
    this.setState({
      activeStep: 0,
      selected: '',
      items: [],
      hasFetched: false
    });
  }

  handleSubmit(event) {
    //Make POST request here
    this.handleReset();
    console.log(this.props.match.params.datasetId);
  }

  renderGraphs() {
    if (this.state.selected === 'boxplot') {
      return <BoxplotChart data={this.state.boxplotData} />;
    } else {
      return <LinegraphChart data={this.state.linegraphData} />;
    }
  }

  componentDidMount() {
    axios
      .get(
        `https://secret-sauce.azurewebsites.net/portal/datablocks/${this.props.match.params.datasetId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`
          }
        }
      )
      .then(res => {
        var itemDict = {};

        res.data.schema.forEach(item => {
          if (item.item_name != null) {
            itemDict[item.item_id] = item.item_id + ' - ' + item.item_name;
          } else {
            itemDict[item.item_id] = item.item_id;
          }
        });

        this.setState({
          allitems: res.data.schema.map(item => item.item_id),
          itemMappings: itemDict
        });
      });
  }

  getStepContent(stepIndex, classes) {
    switch (stepIndex) {
      case 0:
        return (
          <Box display="flex" justifyContent="center" mt={10}>
            <Card
              style={{
                marginRight: '50px'
              }}
            >
              <CardActionArea
                onClick={this.setBoxplot}
                style={
                  this.state.selected === 'boxplot'
                    ? {
                        padding: '50px 50px',
                        border: '1px solid black'
                      }
                    : {
                        padding: '50px 50px'
                      }
                }
              >
                <CardMedia
                  component="img"
                  alt="Boxplot"
                  image={Boxplot}
                  style={{
                    width: '150px'
                  }}
                />
                <Typography variant="h6" align="center">
                  Box Plot
                </Typography>
              </CardActionArea>
            </Card>
            <Card
              style={{
                marginLeft: '50px'
              }}
            >
              <CardActionArea
                onClick={this.setLineGraph}
                style={
                  this.state.selected === 'linegraph'
                    ? {
                        padding: '50px 50px',
                        border: '1px solid black'
                      }
                    : {
                        padding: '50px 50px'
                      }
                }
              >
                <CardMedia
                  component="img"
                  alt="Line graph"
                  image={Linegraph}
                  style={{
                    width: '150px'
                  }}
                />
                <Typography variant="h6" align="center">
                  Line Graph
                </Typography>
              </CardActionArea>
            </Card>
          </Box>
        );

      case 1:
        return (
          <Box display="flex" justifyContent="center">
            <Box mt={10}>
              <Box display="flex" alignItems="center">
                <Typography variant="h6">Choose items (up to 10)</Typography>
                <Tooltip
                  title="Items selected will be presented in the selected graph type"
                  placement="right"
                >
                  <IconButton aria-label="delete">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box style={{ width: 500 }}>
                <Autocomplete
                  multiple
                  options={this.state.allitems}
                  getOptionLabel={option =>
                    this.state.itemMappings[option].toString()
                  }
                  onChange={this.handleChange}
                  value={this.state.items}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="Search Item"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box display="flex" justifyContent="center">
            <Box>
              {this.state.hasFetched ? (
                this.renderGraphs
              ) : (
                <Backdrop className={classes.backdrop} open={true}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
            </Box>
          </Box>
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();

    return (
      <React.Fragment>
        <DashboardTopNav title="data visualisation" />
        <div className={classes.paper}>
          <div className={classes.root}>
            <Stepper activeStep={this.state.activeStep} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {this.state.activeStep === steps.length - 1 ? (
                <div>
                  <Typography className={classes.instructions}>
                    {this.getStepContent(this.state.activeStep, classes)}
                  </Typography>
                  <div className={classes.submitSection}>
                    <Button
                      onClick={this.handleReset}
                      className={classes.backButton}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <Typography className={classes.instructions}>
                    {this.getStepContent(this.state.activeStep)}
                  </Typography>
                  <div className={classes.actionButtons}>
                    <Button
                      disabled={this.state.activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>
                    {this.state.activeStep === steps.length - 2 ? (
                      <Button
                        variant="contained"
                        className={classes.submitButton}
                        onClick={this.generateGraph}
                      >
                        Generate Graph
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DatasetVisualisation);
