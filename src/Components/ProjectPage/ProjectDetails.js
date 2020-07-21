import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import DataUploadForm from './DataUploadForm';
import DatasetsTab from './TabComponents/DatasetsTab';
import ProjectOverviewTab from './TabComponents/ProjectOverviewTab';
import ModelTrainingTab from './TabComponents/ModelTrainingTab';
import OptimisationTab from './TabComponents/OptimisationTab';
import UserControlTable from './TabComponents/UserControlTab';
import axios from 'axios';

const datasetsList = [
  {
    name: 'First Dataset',
    id: 1,
    date: 'Nov 2018',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text'
  },
  {
    name: 'Second Dataset',
    id: 2,
    date: 'Feb 2019',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text'
  }
];

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: 0
  },

  appbar: {
    boxShadow: '0px 0px',
    marginBottom: 30
  },

  title: {
    paddingBottom: 6,
    marginRight: 50,
    fontSize: '1.8em',
    textTransform: 'uppercase',
    borderBottom: '4px solid #F6B318',
    maxWidth: 350
  },

  underlined: {
    borderBottom: '1px solid grey'
  },

  disableFocus: {
    outline: 'none !important'
  }
});

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      datasetList: datasetsList,
      projectId: this.props.match.params.projectId,
      value: 0,
      projectUserList: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.match.params);
    // const id = this.state.projectId;
    // // FETCH & SET STATE
    // let token = localStorage.getItem('token');
    // axios
    //   .get(`https://secret-sauce.azurewebsites.net/portal/projects/${id}`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //       Authorization: `Token ${token}`
    //     }
    //   })
    //   .then(res => {
    //     this.setState({
    //       projectUserList: res.data.owners
    //     });
    //   });
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          color="transparent"
          className={classes.appbar}
        >
          <Box display="flex" alignItems="flex-end" alignContent="flex-start">
            <span className={classes.title}>Project Overview</span>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              aria-label="top nav bar"
              indicatorColor="primary"
              className={classes.underlined}
            >
              <Tab
                label="Overview"
                disableRipple="true"
                className={classes.disableFocus}
                {...a11yProps(0)}
              />
              <Tab
                label="Datasets"
                disableRipple="true"
                className={classes.disableFocus}
                {...a11yProps(1)}
              />
              <Tab
                label="Train Models"
                disableRipple="true"
                className={classes.disableFocus}
                {...a11yProps(2)}
              />
              <Tab
                label="Price Optimisation"
                disableRipple="true"
                className={classes.disableFocus}
                {...a11yProps(3)}
              />
              <Tab
                label="Users"
                disableRipple="true"
                className={classes.disableFocus}
                {...a11yProps(4)}
              />
            </Tabs>
          </Box>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <ProjectOverviewTab projectId={this.state.projectId} />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <DatasetsTab projectId={this.state.projectId} />
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          <ModelTrainingTab />
        </TabPanel>
        <TabPanel value={this.state.value} index={3}>
          <OptimisationTab />
        </TabPanel>
        <TabPanel value={this.state.value} index={4}>
          <UserControlTable
            projectId={this.state.projectId}
            uidList={this.state.projectUserList}
          />
        </TabPanel>
      </div>
    );
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default withStyles(styles, { withTheme: true })(ProjectDetails);
