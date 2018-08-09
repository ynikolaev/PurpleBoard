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
router.put('/updateBoard', ctrlContent.updateBoard);
router.get('/getBoards/:id', ctrlContent.getBoards);
router.get('/getBoard/:id', ctrlContent.getBoard);
router.delete('/removeBoard/:board_id', ctrlContent.removeBoard);
// cards
router.post('/addCard', ctrlContent.addCard);
router.put('/updateCard', ctrlContent.updateCard);
router.get('/getCards/:id', ctrlContent.getCards);
router.delete('/removeCard/:card_id', ctrlContent.removeCard);
//items
router.post('/addItem', ctrlContent.addItem);
router.put('/updateItem', ctrlContent.updateItem);
router.delete('/removeItem/:card_id/:item_id', ctrlContent.removeItem);

module.exports = router;