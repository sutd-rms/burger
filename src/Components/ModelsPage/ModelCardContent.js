import React, { Component } from "react";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import ModelIcon from "../../static/images/model_icon.png";
import { Typography } from "@material-ui/core";

export default class ModelCardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discription: "Demand model for burgers",
      title: "Demand Model"
    };
  }

  render() {
    return this.props.display ? (
      <CardContent className={this.props.backstyle}>
        <Typography variant="body1">{this.props.model.name}</Typography>
        <Typography variant="body2">{this.props.model.description}</Typography>
      </CardContent>
    ) : (
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        image={ModelIcon}
        className={this.props.frontstyle}
      />
    );
  }
}
