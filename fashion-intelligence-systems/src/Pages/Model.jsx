import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { Route, Switch } from "react-router-dom";

import shirt from '../assets/sample_green_shirt.png';
import trouser from '../assets/sample_blue_jeans.png';

import DraggableTshirt from '../components/DraggableTshirt';
import DraggableTrousers from '../components/DraggableTrousers';
import DroppableModel from '../components/DroppableModel';

import "./Model.css";
import model from '../assets/modelresized.jpg';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    minWidth: 345,
    margin: theme.spacing(1),
  },
  media: {
    height: 250,
  },
  paper: {
    maxWidth: "100%",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardLayout: {
    width: "100vw",
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Blogs() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container>
        <Grid item md={5} className="">
          <DroppableModel/>
        </Grid>
        <Grid item md={7}>
          <Grid container>
            <Grid item md={12}>
              <h2> Tshirts </h2>
              <DraggableTshirt src={shirt}/>
            </Grid>
            <Grid item md={12}>
              <h2> Trousers </h2>
              <DraggableTrousers src={trouser}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DndProvider>
  )
}
