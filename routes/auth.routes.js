const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/auth.controller');
const hashPassword = require('../middlewares/hashPassword');
const validateLogin = require('../middlewares/validateLogin');

const router = express.Router();
router.post('/register', hashPassword, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/users', getAllUsers);

module.exports = router;
