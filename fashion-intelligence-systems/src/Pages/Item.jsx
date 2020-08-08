import React, {Component, useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import axios from 'axios';
import "./item.css";
const Item = (props) => {
  const item_id = props.match.params.itemid;
  const [itemData, setItemData] = useState({});
  const [itemColour, setItemColour] = useState("");
  const [imag, setImg] = useState("");
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
  const changeColor = () => {
    console.log("here");
    axios.get( `${global.config.backendURL}/api/items/change_colour`,
      {
        params: {
          img: itemData.image,
          incolour: itemData.colors[0], 
          outcolour: "green"
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
                <span class='item-question'>Site: </span>
                <span class='item-ans'>{itemData.site}</span>
              </div>
              <div className="item-info-div">
                <span class='item-question'>Type: </span>
                <span class='item-ans'>{itemData.clothing}</span>
              </div>
              <div className="item-info-div">
                <span class='item-question'>Color: </span>
                <span class='item-ans'>{itemData.colors}</span>
              </div>
              <div className="item-info-div">
                <span class='item-question'>Status: </span>
                <span class='item-ans'>{itemData.type}</span>
              </div>
              <div className="item-info-div">
                <span class='item-question'>Trendiness Score: </span>
                <span class='item-ans'>{itemData.trending_score}</span>
              </div>
              <Grid container>
                <Grid item xs={4}>
                  <div>
                    <button onClick={changeColor}>Change Color</button>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div>
                    <button>Add to Model</button>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div>
                    <button onClick={viewRawItem}>View Raw Clothing</button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={2}/>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
export default Item;

