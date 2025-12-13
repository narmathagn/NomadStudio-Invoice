const mongoose = require('mongoose');

module.exports = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      userName: { type: String, required: true },
      phoneNumber: { type: String },
      emailId: { type: String },
      address: { type: String }
    },
    { timestamps: true }
  )
);
