import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chart from 'chart.js';
import 'chartjs-chart-box-and-violin-plot';
import * as d3 from 'd3';

const styles = theme => ({
  root: {
    width: '50vw',
    height: '50vh',
    background: 'white',
    padding: '30px 20px 10px 20px',
    borderRadius: '10px',
    webkitBoxShadow: '0px 10px 0px -5px rgba(0,0,0,0.3)',
    mozBoxShadow: '0px 10px 0px -5px rgba(0,0,0,0.3)',
    boxShadow: '0px 10px 0px -5px rgba(0,0,0,0.3)'
  }
});

class Dataset extends React.Component {
  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
    this.makeBoxPlot = this.makeBoxPlot.bind(this);
  }

  chartRef = React.createRef();
  boxRef = React.createRef();

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

  makeBoxPlot() {
    function randomValues(count, min, max) {
      const delta = max - min;
      return Array.from({ length: count }).map(
        () => Math.random() * delta + min
      );
    }

    const boxplotData = {
      // define label tree
      labels: ['16019', '16020', '18001', '18024', '19025', '20032', '20056'],
      datasets: [
        {
          label: 'Dataset 1',
          backgroundColor: 'rgba(255,0,0,0.5)',
          borderColor: 'red',
          borderWidth: 1,
          outlierColor: '#999999',
          padding: 10,
          itemRadius: 0,
          data: [
            randomValues(100, 3, 4),
            randomValues(100, 12, 13),
            randomValues(100, 4, 5),
            randomValues(100, 6, 7),
            randomValues(40, 8, 10),
            randomValues(100, 6, 12),
            randomValues(100, 8, 10)
          ]
        }
      ]
    };

    const myBoxRef = this.boxRef.current.getContext('2d');

    new Chart(myBoxRef, {
      type: 'boxplot',
      data: boxplotData,
      options: {
        responsive: true,
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Prices across items'
        }
      }
    });
  }

  componentDidMount() {
    d3.csv('http://localhost:3000/data.csv')
      .then(this.makeChart)
      .then(this.makeBoxPlot);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.root}>
          <canvas id="myChart" ref={this.chartRef} />
        </div>
        <div id="container">
          <canvas id="canvas" ref={this.boxRef}></canvas>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Dataset);
