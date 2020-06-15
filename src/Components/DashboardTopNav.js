import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    marginBottom: 30,
    fontSize: "1.8em",
    textTransform: "uppercase"
  },

  underlined: {
    borderBottom: "4px solid #F6B318",
    paddingBottom: 6,
    paddingRight: 10
  }
});

class DashboardTopNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <span className={classes.underlined}>{this.props.title}</span>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DashboardTopNav);
