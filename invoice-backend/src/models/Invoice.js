const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Invoice',
  new mongoose.Schema(
    {
      userName: { type: String, required: true },
      phoneNumber: { type: String },
      serviceType: { type: String },
      amountCharged: { type: Number, required: true },
      notes: { type: String },

      ownerDetails: {
        companyName: { type: String },
        ownerName: { type: String },
        phoneNumber: { type: String },
        address: { type: String }
      }
    },
    { timestamps: true }
  )
);
