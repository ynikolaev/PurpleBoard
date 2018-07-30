const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Boards = new mongoose.Schema({
    title: String,
    description: String,
    lastUploaded: Number,
    owner_id: String
});

let Cards = new mongoose.Schema({
    name: String,
    description: String,
    label: String,
    board_id: String
});

module.exports = mongoose.model('Boards', Boards);
module.exports = mongoose.model('Cards', Cards);