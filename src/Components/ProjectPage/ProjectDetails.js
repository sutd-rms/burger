import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Header from "./MarkdownComponents/Header";
import MainMarkDown from "./MarkdownComponents/MainMarkDown";
import FeaturedMarkDown from "./MarkdownComponents/FeaturedMarkDown";
import Footer from "./MarkdownComponents/Footer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

const modelsList = [
  {
    name: "Default Demand Model",
    id: 1,
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text"
  },
  {
    name: "GA Model",
    id: 2,
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content. This works as expected: data is fetched and then rendered. The problem with this solution is that our component contains data loading logic that is coupled to a lifecycle method. This means it’s harder to test and reuse the component. Ideally, we’d want to move this logic out and instead inject items array as a property into this component. That way, we can easily test it and use it in Storybook, for example.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text"
  },
  {
    name: "Other Model",
    id: 3,
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text"
  }
];

const datasetsList = [
  {
    name: "First Dataset",
    id: 1,
    date: "Nov 2018",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text"
  },
  {
    name: "Second Dataset",
    id: 2,
    date: "Feb 2019",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text"
  }
];

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

export default class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      datasetList: datasetsList,
      modelList: modelsList,
      projectName: "Default Project Name",
      projectDescription: "Defualt Project Description",
      createdDate: "06/14/2020",
      company: "McDonald Australia",
      companyLink: "www.google.com",
      img: "https://source.unsplash.com/random"
    };
  }

  componentDidMount() {
    const id = this.props.match.params.projectId;
    // FETCH & SET STATE
    this.setState({
      id: id
    });
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title={this.state.id} />
          <main>
            <MainMarkDown
              name={this.state.projectName}
              description={this.state.projectDescription}
              date={this.state.createdDate}
              img={this.state.img}
            />
            <Grid container spacing={4} direction="row">
              <Grid item xs={6}>
                <Typography
                  component="h2"
                  variant="h5"
                  color="inherit"
                  align="left"
                  noWrap
                >
                  Models in Use
                </Typography>
                <br />
                <Grid container spacing={4} direction="column">
                  {this.state.modelList.map(model => (
                    <FeaturedMarkDown
                      key={model.id}
                      description={model.description}
                      name={model.name}
                      date={model.date}
                      img={model.image}
                    />
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  component="h2"
                  variant="h5"
                  color="inherit"
                  align="left"
                  noWrap
                >
                  Datasets Available
                </Typography>
                <br />
                <Grid container spacing={4} direction="column">
                  {this.state.datasetList.map(dataset => (
                    <FeaturedMarkDown
                      key={dataset.id}
                      description={dataset.description}
                      name={dataset.name}
                      date={dataset.date}
                      img={dataset.image}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </main>
        </Container>
        <br />
        <Footer
          company={this.state.company}
          date={this.state.createdDate}
          link={this.state.companyLink}
        />
      </React.Fragment>
    );
  }
}
