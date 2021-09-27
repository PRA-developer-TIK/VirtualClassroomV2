import React from "react";
import db,{ auth } from "../../firebase/config";
import ClassCard from "../Classes/ClassCard";
import { Grid, Container } from "@material-ui/core";
import Paper from "@mui/material/Paper";

import useStyles from "../../assets/styles/globalStyles/styles";
function AllClasses() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={4} md={3}>
        <ClassCard/>
        </Grid>
      </Grid>
      
    </Container>
  );
}

export default AllClasses;
