const mongoose = require('mongoose');

module.exports = mongoose.model(
  'login',
  new mongoose.Schema({
    userName: { type: String},
    password: String
  })
);
