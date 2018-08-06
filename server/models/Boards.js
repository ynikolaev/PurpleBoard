const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BoardsSchema = new mongoose.Schema({
    title: String,
    description: String,
    lastUploaded: Number,
    owner_id: String
});

let ItemsSchema = new mongoose.Schema({
    text: String,
    label: String,
    assigned_user: String
});

let CardsSchema = new mongoose.Schema({
    name: String,
    description: String,
    label: String,
    board_id: String,
    items: [ItemsSchema],
    child: ItemsSchema
});

module.exports = mongoose.model('Boards', BoardsSchema);
module.exports = mongoose.model('Cards', CardsSchema);
module.exports = mongoose.model('Items', ItemsSchema);