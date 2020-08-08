const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var random = require("mongoose-simple-random");
var schema = new Schema({}, { strict: false });
schema.plugin(random);
var Data = mongoose.model("core-datas", schema);
//var User = mongoose.model('users', userSchema);
module.exports = Data;
