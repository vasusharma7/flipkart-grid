import React, {Component, useState, useEffect} from 'react';
import {Grid, Button, Select, MenuItem, Typography} from '@material-ui/core';
import axios from 'axios';
import "./item.css";
const Item = (props) => {
  const item_id = props.match.params.itemid;
  const [itemData, setItemData] = useState({});
  const [itemColour, setItemColour] = useState("");
  const [imag, setImg] = useState("");
  const [colour, setColour] = useState("");
  useEffect(() => {
    axios.get( `${global.config.backendURL}/api/items`,
      {
        params: {
          ID: item_id 
        }
      })
      .then(res => {
        console.log(res);
        setItemData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },[]);
  console.log(item_id);
  const viewRawItem = () => {
    axios.get( `${global.config.backendURL}/api/items/change_colour`,
      {
        params: {
          img: itemData.image,
          incolour: itemData.colors[0], 
          outcolour: "none"
        }
      })
      .then(res => {
        setImg(res.data);
        setItemColour("green");
      })
      .catch(err => {
        console.log(err);
      });
    return;
  };
  const changeColor = (out_colour) => {
    console.log("here");
    axios.get( `${global.config.backendURL}/api/items/change_colour`,
      {
        params: {
          img: itemData.image,
          incolour: itemData.colors[0], 
          outcolour: out_colour
        }
      })
      .then(res => {
        setImg(res.data);
        setItemColour(out_colour);
      })
      .catch(err => {
        console.log(err);
      });
    return;
  }
  const handleColourChange = (e) => {
    console.log(e.target.value);
    changeColor(e.target.value);
  }
  return (
    <>
      <div class="item-area">
        <Grid container className="item-container">
          <Grid item md={6} className = "item-img-container">
            {
              itemColour == "" &&
            <img src={itemData.image} className="item-img"/>
            }
            { itemColour != "" &&
              <img src={'data:image/jpeg;base64,' + imag} className="item-img"/>
            }
          </Grid>
          <Grid item md={6} className="item-info-container">
            <Grid item md={2}/>
            <Grid item md={8}>
              <div className="item-info-div">
                <Typography>
                <Grid container>
                  <Grid item xs={4}>
                    <span class='item-question'>site: </span>
                  </Grid>
                  <Grid item xs={8}>
                    <span class='item-ans'>{itemData.site}</span>
                  </Grid>
                </Grid>
                </Typography>
              </div>
              <div className="item-info-div">
                <Typography>
                  <Grid container>
                    <Grid item xs={4}>
                      <span class='item-question'>Type: </span>
                    </Grid>
                    <Grid item xs={8}>
                      <span class='item-ans'>{itemData.clothing}</span>
                    </Grid>
                  </Grid>
                </Typography>
              </div>
              <div className="item-info-div">
                <Typography>
                  <Grid container>
                    <Grid item xs={4}>
                      <span class='item-question'>Color: </span>
                    </Grid>
                    <Grid item xs={8}>
                      <span class='item-ans'>{itemData.colors}</span>
                    </Grid>
                  </Grid>
                </Typography>
              </div>
              <div className="item-info-div">
                <Typography>
                  <Grid container>
                    <Grid item xs={4}>
                      <span class='item-question'>Status: </span>
                    </Grid>
                    <Grid item xs={8}>
                      <span class='item-ans'>{itemData.type}</span>
                    </Grid>
                  </Grid>
                </Typography>
              </div>
              <div className="item-info-div">
                <Typography>
                  <Grid container>
                    <Grid item xs={4}>
                      <span class='item-question'>Trendiness Score: </span>
                    </Grid>
                    <Grid item xs={8}>
                      <span class='item-ans'>{itemData.trending_score}</span>
                    </Grid>
                  </Grid>
                </Typography>
              </div>
              <div className="item-buttons">
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      Colour:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Select labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={itemColour}
                            label="Change Color"
                            className="item-change-colour-btn"
                      onChange={(e) => handleColourChange(e)}
                    >
                      <MenuItem value={"red"}>Red</MenuItem>
                      <MenuItem value={"green"}>Green</MenuItem>
                      <MenuItem value={"blue"}>Blue</MenuItem>
                      <MenuItem value={"black"}>Black</MenuItem>
                    </Select>
                  </Grid>
                  <span className='gutter'/>
                  <Grid item xs={6}>
                    <div>
                      <Button onClick = {() => props.history.push("/home/model")}>Add to Model</Button>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div>
                      <Button onClick={viewRawItem}>View Raw Clothing</Button>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item md={2}/>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
export default Item;

