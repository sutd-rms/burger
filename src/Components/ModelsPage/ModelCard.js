import React from "react";
import { useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import ModelCardContent from "./ModelCardContent";

// import ProjectCardContent from "./ProjectCardContent";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 175,
    maxHeight: 175,
    justifyContent: "center"
  },
  media: {
    height: 130,
    width: 130,
    justifySelf: "center",
    justifyContent: "center",
    padding: 20
  },
  cardtext: {
    width: 130,
    height: 130,
    justifySelf: "center"
  }
}));

export default function ModelCard(props) {
  let match = useRouteMatch();
  const classes = useStyles();

  const [display, setDisplay] = React.useState(false);

  const handlePopoverOpen = () => {
    setDisplay(true);
  };

  const handlePopoverClose = () => {
    setDisplay(false);
  };

  const handelClick = () => {
    window.location.href = `${match.path}/${props.model.id}`;
  };

  return (
    <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      <Card className={classes.root}>
        <CardActionArea onClick={handelClick}>
          <ModelCardContent
            model={props.model}
            display={display}
            frontstyle={classes.media}
            backstyle={classes.cardtext}
          />
        </CardActionArea>
      </Card>
    </div>
  );
}
