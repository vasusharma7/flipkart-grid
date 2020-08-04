const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const config = require("config");
var fs = require("fs");
const axios = require("axios");
var path = require("path");
const Blogs = require("../models/blogs.model");

router.get("/getBlogsData", async (req, res) => {
  //Vogue and Ape To Gentleman only till now
  Blogs.find({ source: "Vogue" }).then(resp1 => {
    Blogs.find({ source: "Ape To GentleMan" }).then(resp2 => {
      res.json({ men: resp2, women: resp1 });
    });
  });
});
module.exports = router;
