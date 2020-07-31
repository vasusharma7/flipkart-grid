const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var User = mongoose.model('users', new Schema({}, { strict: false }));
//var User = mongoose.model('users', userSchema);
module.exports = User;
