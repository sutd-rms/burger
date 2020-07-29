import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chart from 'chart.js';
import 'chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js';

const styles = theme => ({
  root: {
    width: '60vw',
    height: '60vh',
    background: 'white',
    padding: '30px 20px 10px 20px',
    borderRadius: '10px'
  }
});

class Boxplot extends React.Component {
  constructor(props) {
    super(props);
    this.makeBoxPlot = this.makeBoxPlot.bind(this);
    this.state = {
      data: this.props.data
    };
  }

  boxRef = React.createRef();

  makeBoxPlot() {
    const boxplotData = {
      labels: this.state.data.items,
      datasets: [
        {
          label: 'Dataset',
          backgroundColor: 'rgba(255,0,0,0.5)',
          borderColor: 'red',
          borderWidth: 1,
          outlierColor: '#999999',
          padding: 10,
          itemRadius: 0,
          data: this.state.data.datasets
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
        tooltipDecimals: 2,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Price'
              }
            }
          ]
        }
      }
    });
  }

  componentDidMount() {
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
