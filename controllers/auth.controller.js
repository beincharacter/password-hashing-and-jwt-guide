const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Controller for handling user login
const loginUser = async (req, res) => {
  try {
    // Generate a JWT token
    const token = jwt.sign(
      { id: req.user._id, username: req.user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    // Respond with the token
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: req.user._id, username: req.user.username }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Controller for getting all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('_id username');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Controller for registering users
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    // Create a new user
    const newUser = await User.create({
      username,
      password,
    });
    // User is saved to the database at this point
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
