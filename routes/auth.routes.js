const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { loginUser, registerUser, getAllUsers } = require('../controllers/auth.controller');
const router = express.Router();

// Example auth route: Respond with a simple message on login attempt
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/users', getAllUsers);

module.exports = router;
