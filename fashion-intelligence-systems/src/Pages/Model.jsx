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
import shirt2 from '../assets/shirt2.png';
import trouser from '../assets/sample_blue_jeans.png';
import trouser2 from '../assets/trousers2.png';
import trouser3 from '../assets/trousers3.png';

import DraggableTshirt from '../components/DraggableTshirt';
import DraggableTrousers from '../components/DraggableTrousers';
import DraggableShorts from '../components/DraggableShorts';
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

export default function Model() {
  const classes = useStyles();
  const history = useHistory();
  const tshirts = [shirt, shirt2];
  const trousers = [trouser2, trouser];
  const shorts = [trouser3];
  const renderTshirts = () => {
    var tshirtsElem = [];
    tshirts.forEach((tshirt) => {
      tshirtsElem.push(<Grid item xs={4}> <DraggableTshirt src={tshirt}/> </Grid>);
    });
    return tshirtsElem;
  }
  const renderTrousers = () => {
    var trousersElem = [];
    trousers.forEach((trouser) => {
      trousersElem.push(<Grid item xs={4}> <DraggableTrousers src={trouser} /> </Grid>);
    });
    return trousersElem;
  };
  const renderShorts = () => {
    var shortsElem = [];
    shorts.forEach((short) => {
      shortsElem.push(<Grid item xs={4}> <DraggableShorts src={short} /> </Grid>);
    });
    return shortsElem;
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container>
        <Grid item md={5} className="">
          <DroppableModel/>
        </Grid>
        <Grid item md={7}>
          <Grid container>
            <Grid item xs={2}/>
            <Grid item xs={8}>
              <Grid container>
                <Grid item md={12}>
                  <Typography><h2> Tshirts </h2></Typography>
                  <Grid container spacing = {4}>
                    {renderTshirts()}
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <h2> Trousers </h2>
                  <Grid container>
                    {renderTrousers()}
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <h2> Shorts </h2>
                  <Grid container>
                    {renderShorts()}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}/>
          </Grid>
        </Grid>
      </Grid>
    </DndProvider>
  )
}
