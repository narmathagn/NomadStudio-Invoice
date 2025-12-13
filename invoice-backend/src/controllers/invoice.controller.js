const Invoice = require('../models/Invoice');

// CREATE
exports.createInvoice = async (req, res) => {
  const invoice = await Invoice.create(req.body);
  res.json(invoice);
};

// LIST
exports.getInvoices = async (req, res) => {
  const invoices = await Invoice.find().sort({ createdAt: -1 });
  res.json(invoices);
};

// UPDATE
exports.updateInvoice = async (req, res) => {
  const invoice = await Invoice.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(invoice);
};

// DELETE
exports.deleteInvoice = async (req, res) => {
  await Invoice.findByIdAndDelete(req.params.id);
  res.json({ message: 'Invoice deleted' });
};
