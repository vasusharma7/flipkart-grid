import React, {Component, useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import axios from 'axios';
import "./item.css";
const Item = (props) => {
  const item_id = props.match.params.itemid;
  const [itemData, setItemData] = useState({});
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
  return (
    <>
      <div class="item-area">
        <Grid container className="item-container">
          <Grid item md={6} className = "item-img-container">
            <img src={itemData.image} className="item-img"/>
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
            </Grid>
            <Grid item md={2}/>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
export default Item;

