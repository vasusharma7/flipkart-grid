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

router.get("/getBlogsData", async (req, res) => {
  //Vogue and Ape To Gentleman only till now
  Blogs.find({ source: "Vogue" }).then(resp1 => {
    Blogs.find({ source: "Ape To GentleMan" }).then(resp2 => {
      res.json({ men: resp2, women: resp1 });
    });
  });
});

router.get("/fetch", async (req, res) => {
  var data = {};
  await Data.find({ trending: false }).then(resp => {
    return res.json(resp);
  });
});
module.exports = router;
