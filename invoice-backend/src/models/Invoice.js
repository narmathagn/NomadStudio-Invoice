const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Invoice',
  new mongoose.Schema(
    {
      userName: { type: String, required: true },
      phoneNumber: { type: String },
       // Array of service objects with individual pricing
      services: [
        {
          serviceType: { type: String, required: true },
          notes: { type: String },
          amountCharged: { type: Number, required: true },
          
        }
      ],
       totalAmount: { type: Number },

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
