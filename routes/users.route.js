const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/Users');
const ctrlAuth = require('../controllers/authentication');
const ctrlProfile = require('../controllers/profile');
const jwt = require('express-jwt');
const config = require('../config/config.json');
const auth = jwt({
  secret: config.secret,
  userProperty: 'payload'
});

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/isEmailRegisterd', ctrlAuth.isEmailRegisterd);

module.exports = router;