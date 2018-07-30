const express = require('express');
const router = express.Router({mergeParams:true});
const mongoose = require('mongoose');
const User = require('../models/Users');
const Board = require('../models/Boards');
const ctrlAuth = require('../controllers/authentication');
const ctrlProfile = require('../controllers/profile');
const ctrlContent = require('../controllers/boardContent');
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
// boards
router.post('/addBoard', ctrlContent.addBoard);
router.put('/updateTime', ctrlContent.updateTime);
router.get('/getBoards/:id', ctrlContent.getBoards);
router.get('/getBoard/:id', ctrlContent.getBoard);
// cards
router.post('/addCard', ctrlContent.addCard);
router.get('/getCards/:id', ctrlContent.getCards);

module.exports = router;