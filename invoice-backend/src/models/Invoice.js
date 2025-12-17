const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  serviceType: { type: String, required: true },
  quantity: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
  amountCharged: { type: Number, required: true },
  notes: { type: String }
});

const invoiceSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    phoneNumber: { type: String, required: true },

    services: { type: [serviceSchema], required: true },

    totalAmount: { type: Number, required: true },
    receivedAmount: { type: Number, required: true },
    balanceAmount: { type: Number, required: true },

    ownerDetails: {
      companyName: String,
      ownerName: String,
      phoneNumber: String,
      address: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Invoice', invoiceSchema);
