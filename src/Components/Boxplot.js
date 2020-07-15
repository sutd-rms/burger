import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chart from 'chart.js';
import 'chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js';
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

class Boxplot extends React.Component {
  constructor(props) {
    super(props);
    this.makeBoxPlot = this.makeBoxPlot.bind(this);
  }

  boxRef = React.createRef();

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
        },
        tooltipDecimals: 2
      }
    });
  }

  componentDidMount() {
    // d3.csv('http://localhost:3000/data.csv').then(this.makeBoxPlot);
    this.makeBoxPlot();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <canvas id="canvas" ref={this.boxRef}></canvas>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Boxplot);
