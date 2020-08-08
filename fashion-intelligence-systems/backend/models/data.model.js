const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Data = mongoose.model("coreDatas", new Schema({}, { strict: false }));
//var User = mongoose.model('users', userSchema);
module.exports = Data;
