import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  }
}));

export default function MainMarkDown(props) {
  const classes = useStyles();
  const { img, name, description, date } = props;

  return (
    <Paper
      className={classes.mainFeaturedPost}
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: "none" }} src={img} />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {date}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {description}
            </Typography>
            <Link variant="subtitle1" href="#">
              Go to company's site...
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainMarkDown.propTypes = {
  post: PropTypes.object
};