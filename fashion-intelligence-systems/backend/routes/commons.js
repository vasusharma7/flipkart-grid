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

router.get("/fetchCategory/:category", async (req, res) => {
  const {category} = req.params;
  console.log(category)
  var options = {
    skip: 10,
    limit: 10,
    count: 5,
  };

  const data = await new Promise((resolve, reject) => {
    Data.find({ trending: true,clothing:category }, async function (err, results1) {
      if (err) res.status(400);
      var temp = [];
      for (let i = 0; i < 10; i++) {
        const random = Math.floor(Math.random() * results1.length);
        temp.push(results1[random]);
        results1.splice(random, 1);
      }
      results1 = temp;
      results1.sort(function (a, b) {
        return b._doc["trending_score"] - a._doc["trending_score"];
      });

      Data.find({ trending: false,clothing:category  }, function (err, results2) {
        // console.log(results2);
        if (err) res.status(400);
        var temp = [];
        for (let i = 0; i < 10; i++) {
          const random = Math.floor(Math.random() * results2.length);
          temp.push(results2[random]);
          results2.splice(random, 1);
        }
        results2 = temp;
        results2.sort(function (a, b) {
          return b._doc["trending_score"] - a._doc["trending_score"];
        });
        results2.sort(function (a, b) {
          console.log(b._doc["trending_score"] - a._doc["trending_score"]);
          return b._doc["non_trending_score"] - a._doc["non_trending_score"];
        });
        resolve({ trending: results1, non_trending: results2 });
      });
    });
  });
  console.log(data);
  res.json(data);
});
router.get("/fetch", async (req, res) => {
  // var filter = { type: { $in: ["trending_score"] } };
  // var fields = { trending: true };
  var options = {
    skip: 10,
    limit: 10,
    count: 5,
  };

  const data = await new Promise((resolve, reject) => {
    Data.find({ trending: true }, async function (err, results1) {
      if (err) res.status(400);
      var temp = [];
      for (let i = 0; i < 10; i++) {
        const random = Math.floor(Math.random() * results1.length);
        temp.push(results1[random]);
        results1.splice(random, 1);
      }
      results1 = temp;
      results1.sort(function (a, b) {
        return b._doc["trending_score"] - a._doc["trending_score"];
      });

      Data.find({ trending: false }, function (err, results2) {
        // console.log(results2);
        if (err) res.status(400);
        var temp = [];
        for (let i = 0; i < 10; i++) {
          const random = Math.floor(Math.random() * results2.length);
          temp.push(results2[random]);
          results2.splice(random, 1);
        }
        results2 = temp;
        results2.sort(function (a, b) {
          return b._doc["trending_score"] - a._doc["trending_score"];
        });
        results2.sort(function (a, b) {
          console.log(b._doc["trending_score"] - a._doc["trending_score"]);
          return b._doc["non_trending_score"] - a._doc["non_trending_score"];
        });
        resolve({ trending: results1, non_trending: results2 });
      });
    });
  });
  console.log(data);
  res.json(data);
});
module.exports = router;
