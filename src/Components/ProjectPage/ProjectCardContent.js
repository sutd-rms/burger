import React, { Component } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import FolderIcon from '../../static/images/folder.png';

export default class ProjectCardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.display ? (
      <CardContent className={this.props.backstyle}>
        <Typography variant="body1">{this.props.project.title}</Typography>
        <Typography variant="body2">
          {this.props.project.description}
        </Typography>
      </CardContent>
    ) : (
      <CardMedia
        component="img"
        alt="Project Image"
        image={this.props.project.cover || FolderIcon}
        className={this.props.frontstyle}
      />
    );
  }
}
