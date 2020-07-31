const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const config = require("config");
var fs = require("fs");
const axios = require("axios");
var path = require("path");
const User = require("../models/user.model");
const au = config.get("adminUser");
const ap = config.get("adminPass");

router.post("/auth", async (req, res) => {
  try {
    const { email, password } = req.body;

    User.findOne({ email }, async function (err, user) {
      if (err) {
        console.log("error");
        res.status(400).json({ err: "Error finding in Database" });
      }
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      console.log(user._doc.password);

      const isMatch = await bcrypt.compare(password, user._doc.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        user: {
          id: user._doc.email,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user_details: {
              email: user.email,
            },
          });
        }
      );
    });
    // let user = await User.findOne({ sss_no: 1 });
  } catch (e) {
    res.status(400).json({ msg: "Please enter all details" });
    return;
  }
});

router.post("/register", (req, res) => {
  console.log("inside register");
  var data = req.body;
  var email = data.email;
  var password = data.password;
  User.findOne({ email }, (err, usr) => {
    if (err) {
      throw err;
    }
    if (usr) {
      console.log("User Exists");
      res.status(401).json("User ALready Exist");
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            console.log(err);
            res.status(400).json("Error");
            throw err;
          }
          data["password"] = hash;
          var obj = new User(data);
          obj.save(err => {
            if (err) throw err;
            console.log("saved");
            res.status(200).json("user created successfully");
          });
        });
      });
    }
  });
});

// router.get("/adminAuth", auth, async (req, res) => {
//   try {
//     const { username: email, pass } = req.body.body;

//     if (email === au) {
//       const isMatch = await bcrypt.compare(pass, ap);

//       if (!isMatch) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: "Invalid Credentials" }] });
//       }
//       const payload = {
//         user: {
//           id: au,
//         },
//       };

//       jwt.sign(
//         payload,
//         config.get("jwtSecret"),
//         { expiresIn: 3600 },
//         (err, token) => {
//           if (err) throw err;
//           res.json({
//             token,
//             user_details: {
//               email: au,
//             },
//           });
//         }
//       );
//     } else {
//       return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
//     }
//     // let user = await User.findOne({ sss_no: 1 });
//   } catch (e) {
//     res.status(400).json({ msg: "Please enter all details" });
//     return;
//   }
// });

module.exports = router;
