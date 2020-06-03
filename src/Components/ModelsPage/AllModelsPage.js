import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ModelCard from "./ModelCard";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 5
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(5)
  }
}));

export default function AllModelsPage() {
  const [modelsIdList, setModelsIdList] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const classes = useStyles();

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={7}>
          {modelsIdList.map(value => (
            <Grid key={value} item>
              <ModelCard projectId={value} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
