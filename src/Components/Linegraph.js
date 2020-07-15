import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chart from 'chart.js';
import * as d3 from 'd3';

const styles = theme => ({
  root: {
    width: '60vw',
    height: '60vh',
    background: 'white',
    padding: '30px 20px 10px 20px',
    borderRadius: '10px',
    webkitBoxShadow: '0px 10px 0px -5px rgba(0,0,0,0.3)',
    mozBoxShadow: '0px 10px 0px -5px rgba(0,0,0,0.3)',
    boxShadow: '0px 10px 0px -5px rgba(0,0,0,0.3)'
  }
});

class Linegraph extends React.Component {
  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
  }

  chartRef = React.createRef();

  makeChart(players) {
    const myChartRef = this.chartRef.current.getContext('2d');

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    function getItemsIndex(target, item) {
      return target.findIndex(element => element == item);
    }

    var items = players
      .map(function(d) {
        return d.Item_ID;
      })
      .sort();
    var uniqueItems = items.filter(onlyUnique);
    var weeks = players.map(function(d) {
      return d.Wk;
    });
    var uniqueWeeks = weeks.filter(onlyUnique);
    var processedData = { labels: uniqueWeeks, datasets: [] };

    uniqueItems.forEach(item => {
      processedData.datasets.push({ data: [], label: item });
    });

    players.forEach(item => {
      var idx = getItemsIndex(uniqueItems, item.Item_ID);
      processedData.datasets[idx].data.push(item.Qty_);
    });

    new Chart(myChartRef, {
      type: 'line',
      data: processedData,
      options: {
        //Customize chart options
        title: {
          display: true,
          text: 'Quantity across Weeks'
        }
      }
    });
  }

  componentDidMount() {
    d3.csv('http://localhost:3000/data.csv').then(this.makeChart);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Linegraph);
