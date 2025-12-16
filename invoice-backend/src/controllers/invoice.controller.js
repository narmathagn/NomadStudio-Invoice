const Invoice = require('../models/Invoice');

// CREATE
exports.createInvoice = async (req, res) => {
  try {
    // Auto-calculate totalAmount from services
    if (req.body.services && req.body.services.length > 0) {
      req.body.totalAmount = req.body.services.reduce(
        (sum, service) => sum + (service.amountCharged || 0), 
        0
      );
    }
    
    const invoice = await Invoice.create(req.body);
    res.json(invoice);
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ 
        message: 'Validation failed or Create Failed', 
        errors: err.issues 
      });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: err.message 
      });
    }
    return res.status(500).json({ message: 'Server error' });
  }
};

// LIST
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// GET SINGLE INVOICE
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE
exports.updateInvoice = async (req, res) => {
  try {
    // Auto-calculate totalAmount from services
    if (req.body.services && req.body.services.length > 0) {
      req.body.totalAmount = req.body.services.reduce(
        (sum, service) => sum + (service.amountCharged || 0), 
        0
      );
    }
    
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    res.json(invoice);
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ 
        message: 'Validation failed or Update Failed', 
        errors: err.issues 
      });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: err.message 
      });
    }
    return res.status(500).json({ message: 'Server error' });
  } 
};

// DELETE
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    res.json({ message: 'Invoice deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};