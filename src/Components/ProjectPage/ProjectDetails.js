import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Header from './MarkdownComponents/Header';
import MainMarkDown from './MarkdownComponents/MainMarkDown';
import FeaturedMarkDown from './MarkdownComponents/FeaturedMarkDown';
import Footer from './MarkdownComponents/Footer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PriceSearchTable from './PriceSearchTable';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import DataUploadForm from './DataUploadForm';
import ProjectOverview from './ProjectOverview';

const modelsList = [
  {
    name: 'Default Demand Model',
    id: 1,
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text'
  },
  {
    name: 'GA Model',
    id: 2,
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This works as expected: data is fetched and then rendered. The problem with this solution is that our component contains data loading logic that is coupled to a lifecycle method. This means it’s harder to test and reuse the component. Ideally, we’d want to move this logic out and instead inject items array as a property into this component. That way, we can easily test it and use it in Storybook, for example.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text'
  },
  {
    name: 'Other Model',
    id: 3,
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text'
  }
];

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
      modelList: modelsList,
      projectName: 'Default Project Name',
      projectDescription: 'Default Project Description',
      createdDate: '06/14/2020',
      company: 'McDonald Australia',
      companyLink: 'www.google.com',
      img: 'https://source.unsplash.com/random',
      value: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.projectId;
    // FETCH & SET STATE
    this.setState({
      id: id
    });
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
            <span className={classes.title}>McDonalds Australia</span>
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
          <ProjectOverview />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={this.state.value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={this.state.value} index={4}>
          Item Five
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
