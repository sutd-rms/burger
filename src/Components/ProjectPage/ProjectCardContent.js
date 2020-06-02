import React, { Component } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import McLogo from '../../static/images/McDonaldLogo.png';
import { Typography } from '@material-ui/core';

export default class FloatingAddButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discription: 'Prizing Optimization for McDonald Australia 2020',
      title: 'McDonald'
    };
  }

  render() {
    return this.props.display ? (
      <CardContent className={this.props.backstyle}>
        <Typography variant="body1">{this.state.title}</Typography>
        <Typography variant="body2">{this.state.discription}</Typography>
      </CardContent>
    ) : (
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        image={McLogo}
        className={this.props.frontstyle}
      />
    );
  }
}
