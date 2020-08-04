const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Blogs = mongoose.model("blogs", new Schema({}, { strict: false }));
//var User = mongoose.model('users', userSchema);
module.exports = Blogs;
