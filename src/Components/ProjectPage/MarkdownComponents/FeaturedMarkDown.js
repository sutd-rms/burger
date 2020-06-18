import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { Button } from '@material-ui/core';
import TrainModel from '../../ModelsPage/TrainModel';

const useStyles = makeStyles({
  card: {
    display: 'flex'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  }
});

export default function FeaturedMarkDown(props) {
  const classes = useStyles();
  const { name, description, date, img, id, isModel } = props;

  let [openDialog, setOpenDialog] = useState(false);

  let handleClick = () => {
    if (isModel) {
      setOpenDialog(true);
    } else {
      console.log('window to dataset detail page');
    }
  };
  let handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Grid item>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {description}
            </Typography>
            <Button color="primary" onClick={handleClick}>
              {props.buttonContent}
            </Button>
          </CardContent>
        </div>
        <Hidden xsDown>
          <CardMedia className={classes.cardMedia} image={img} title={name} />
        </Hidden>
      </Card>
      {isModel && openDialog ? (
        <TrainModel handleClose={handleClose} name={name} key={name} />
      ) : (
        ''
      )}
    </Grid>
  );
}

FeaturedMarkDown.propTypes = {
  post: PropTypes.object
};
