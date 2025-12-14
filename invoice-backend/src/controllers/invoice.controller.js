const Invoice = require('../models/Invoice');

// CREATE
exports.createInvoice = async (req, res) => {
  try{
  const invoice = await Invoice.create(req.body);
  res.json(invoice);
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: 'Validation failed or Create Failed', errors: err.issues });
    return res.status(500).json({ message: 'Server error' });
  }
};

// LIST
exports.getInvoices = async (req, res) => {
  try{
  const invoices = await Invoice.find().sort({ createdAt: -1 });
  res.json(invoices);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE
exports.updateInvoice = async (req, res) => {
  try{
  const invoice = await Invoice.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(invoice);
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: 'Validation failed or Update Failed', errors: err.issues });
    return res.status(500).json({ message: 'Server error' });
  } 
};

// DELETE
exports.deleteInvoice = async (req, res) => {
  try{
  await Invoice.findByIdAndDelete(req.params.id);
  res.json({ message: 'Invoice deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};
