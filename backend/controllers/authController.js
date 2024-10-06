const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), message: 'Validation failed' });
  }

  const { userName, password } = req.body;
  const user = await User.findOne({ userName });

  if (!user) {
    return res.status(401).json({ message: 'Invalid login details' });
  }

  if (await bcrypt.compare(password, user.password)) {
    // Optionally, implement JWT or session here
    return res.json({ message: 'Login successful', user });
  } else {
    return res.status(401).json({ message: 'Invalid login details' });
  }
};


exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ userName, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: 'User registered' });
};
