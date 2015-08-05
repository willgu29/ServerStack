var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String, //User_id field for now..
  phoneNumber: Number,
  password: String,
  firstName: String,
  lastName: String,
  fullName: String,
  dateCreated: {type: Date, default: Date.now},
  role: String

});

module.exports = User = mongoose.model('User', userSchema);
