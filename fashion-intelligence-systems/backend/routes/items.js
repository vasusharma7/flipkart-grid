const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const config = require("config");
var fs = require("fs");
const axios = require("axios");
var path = require("path");
const Blogs = require("../models/blogs.model");
const Data = require("../models/data.model");

router.get("/", async (req, res) => {
  const item_id = req.query['ID'];
  console.log(item_id);
  await Data.findOne({_id:item_id}).then(resp => {
    console.log(resp);
    return res.json(resp);
  });
  // For testing
  /*
  return res.json({
    "_id": "5f2e6ed401496c52217f9163",
    "image": "https://drive.google.com/uc?id=17D17lzq_QkH6S4SnZ2i86Hn1kwD-rKc5",
    "clothing_orig": "tshirts",
    "site": "flipkart",
    "type": "non-trending",
    "color_orig": "All",
    "colors": [
      "black"
    ],
    "clothing": [
      "shirt"
    ],
    "trending_score": 0.01192521583288908,
    "non_trending_score": 0.9880748391151428,
    "trending": false
  });
  */
});
router.get("/change_colour", async (req, res) => {
  const incolour = req.query['incolour'];
  const outcolour = req.query['outcolour'];
  const image_link = req.query['img'];
  axios.post('http://localhost:4000/change_colour/',
    {
      img: image_link,
      incolour: incolour,
      outcolour: outcolour
    })
    .then(re => {
      res.send(re.data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;


