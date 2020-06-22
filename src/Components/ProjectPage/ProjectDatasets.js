import React from 'react';
import Grid from '@material-ui/core/Grid';
import DatasetCard from './DatasetCard';

class ProjectDatasets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetsList: [
        {
          id: 20200623,
          name: 'Sample dataset from McDonald',
          description: 'Sample Description'
        },
        {
          id: 20200624,
          name: 'Sample dataset from McDonald',
          description: 'Sample Description'
        },
        {
          id: 20200625,
          name: 'Sample dataset from McDonald',
          description: 'Sample Description'
        },
        {
          id: 20200626,
          name: 'Sample dataset from McDonald',
          description: 'Sample Description'
        }
      ]
    };
  }

  render() {
    return (
      <Grid container spacing={4} direction="column">
        {this.state.datasetsList.map(dataset => (
          <Grid item>
            <DatasetCard dataset={dataset} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default ProjectDatasets;
