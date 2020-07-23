import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chart from 'chart.js';
import * as d3 from 'd3';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '25vw',
    height: '25vh',
    background: 'white',
    padding: '30px 20px 10px 20px',
    borderRadius: '10px'
  }
});

class Linegraph extends React.Component {
  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
    // this.processData = this.processData.bind(this);

    this.state = {
      data: this.props.data
    };

    [...Array(10)].map((e, i) => (this[`chart-${i}`] = React.createRef()));
  }

  makeChart(processedData) {
    [...Array(processedData.length)].map((e, idx) => {
      var myChartRef = this[`chart-${idx}`].current.getContext('2d');
      new Chart(myChartRef, {
        type: 'line',
        data: processedData[idx],
        options: {
          //Customize chart options
          title: {
            display: true,
            text: processedData[idx].datasets[0].label
          },
          legend: {
            display: false
          }
        }
      });
    });
  }

  // FOR CREATING MOCK DATA

  // processData(players) {
  //   function onlyUnique(value, index, self) {
  //     return self.indexOf(value) === index;
  //   }

  //   function getItemsIndex(target, item) {
  //     return target.findIndex(element => element == item);
  //   }

  //   var items = players
  //     .map(function(d) {
  //       return d.Item_ID;
  //     })
  //     .sort();
  //   var uniqueItems = items.filter(onlyUnique);
  //   var weeks = players.map(function(d) {
  //     return d.Wk;
  //   });
  //   var uniqueWeeks = weeks.filter(onlyUnique);

  //   var processedData = [];

  //   uniqueItems.forEach(item => {
  //     processedData.push({
  //       labels: uniqueWeeks,
  //       datasets: [{ data: [], label: item }]
  //     });
  //   });

  //   players.forEach(item => {
  //     var idx = getItemsIndex(uniqueItems, item.Item_ID);
  //     processedData[idx].datasets[0].data.push(item.Qty_);
  //   });

  //   return processedData;
  // }

  componentDidMount() {
    // FOR CREATING MOCK DATA
    // d3.csv('/data.csv')
    //   .then(this.processData)
    //   .then(this.makeChart);

    const weeks = this.state.data.weeks;
    const processedData = [];

    Object.keys(this.state.data.datasets).forEach(key => {
      processedData.push({
        labels: weeks,
        datasets: [{ data: this.state.data.datasets[key], label: key }]
      });
    });

    this.makeChart(processedData);
  }

  render() {
    const { classes } = this.props;

    return (
      <Box textAlign="center">
        <Typography variant="h6">Quantity across Weeks</Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {[...Array(10)].map((e, i) => (
            <div className={classes.root}>
              <canvas
                id={`chart-${i.toString()}`}
                key={`chart-${i.toString()}`}
                ref={this[`chart-${i}`]}
              />
            </div>
          ))}
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Linegraph);
