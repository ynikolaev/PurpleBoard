const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

let Users = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: String,
  lastname: String,
  registration_date: {
    type: Date,
    default: Date.now
  },
  isFirstTime: {
    type: Boolean,
    default: true
  },
  hash: String,
  salt: String
});

Users.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

Users.methods.validPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

Users.methods.generateJwt = function () {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstname: this.name,
    lastname: this.name,
  }, config.secret, {
    expiresIn: 86400
  }); //24h
};

module.exports = mongoose.model('Users', Users);
