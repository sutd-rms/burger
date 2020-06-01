import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';

export default class FloatingAddButton extends Component {
  render() {
    const style = {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed'
    };

    return (
      <div onClick={this.props.onClick}>
        <Fab color="primary" aria-label="add" style={style}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}
