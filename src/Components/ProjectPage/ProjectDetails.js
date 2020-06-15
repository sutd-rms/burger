import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import FloatingAddButton from "../FloatingAddButton";
import Header from "./MarkdownComponents/Header";
import MainMarkDown from "./MarkdownComponents/MainMarkDown";
import FeaturedMarkDown from "./MarkdownComponents/FeaturedMarkDown";
import MarkDown from "./MarkdownComponents/MarkDown";
import Footer from "./MarkdownComponents/Footer";
import txt from "../../static/sample_text.txt";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

const posts = [txt];

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…"
};

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

export default function ProjectDetails(props) {
  let { projectId } = useParams();
  let [datasetList, setDatasetList] = useState(datasetsList);
  let [modelList, setModelList] = useState(modelsList);
  let [projectName, setProjectName] = useState("Default Project Name");
  let [projectDescription, setProjectDescription] = useState(
    "Defualt Project Description"
  );
  let [createdDate, setCreatedDate] = useState("06/14/2020");
  let [company, setCompany] = useState("McDonald Australia");
  let [companyLink, setCompanyLink] = useState("www.google.com");
  let [img, setImg] = useState("https://source.unsplash.com/random");
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={projectId} />
        <main>
          <MainMarkDown
            name={projectName}
            description={projectDescription}
            date={createdDate}
            img={img}
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
              {/* <Divider variant="middle" /> */}
              <br />
              <Grid container spacing={4} direction="column">
                {modelList.map(model => (
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
            {/* <Divider variant="middle" orientation="vertical"/> */}

            {/* <br /> */}
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
              {/* <Divider variant="middle" /> */}
              <br />
              <Grid container spacing={4} direction="column">
                {datasetList.map(dataset => (
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
      <Footer company={company} date={createdDate} link={companyLink} />
    </React.Fragment>
  );
}
