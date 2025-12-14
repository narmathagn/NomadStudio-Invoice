const User = require('../models/User');

// CREATE
exports.createUser = async (req, res) => {
  try {   
  const user = await User.create(req.body);
  res.json(user);
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: 'Validation failed Or Create User Failed', errors: err.issues });
    return res.status(500).json({ message: 'Server error' });
  }
};

// READ ALL
exports.getUsers = async (req, res) => {
  try{
  const users = await User.find();
  res.json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// READ ONE
exports.getUserById = async (req, res) => {
  try{
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  } 
};

// READ ONE
exports.getUserById = async (req, res) => {
  try{
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user); 
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  } 
};

// UPDATE
exports.updateUser = async (req, res) => {
  try{
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(user);
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: 'Validation failed or Update Failed', errors: err.issues });
    return res.status(500).json({ message: 'Server error' });
  }       
};

// DELETE
exports.deleteUser = async (req, res) => {
  try{
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  } 
};
