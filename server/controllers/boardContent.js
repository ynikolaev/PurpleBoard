const passport = require('passport');
const mongoose = require('mongoose');
const Board = mongoose.model('Boards');
const profile = require('./profile');
const Card = mongoose.model('Cards');

module.exports.addBoard = function (req, res) {

    let board = new Board();

    board.title = String(req.body.title);
    board.description = String(req.body.description);
    board.lastUploaded = parseInt(req.body.lastUploaded);
    board.owner_id = String(req.body.owner_id);

    board.save(function (err, result) {
        if (err) {
            response = { success: false, message: "Error adding data" };
        } else {
            response = { success: true, message: "Data added", boards: result };
        }
        res.json(response);
    });
};

module.exports.updateTime = function (req, res) {
    let id = req.body._id;
    let newvalues = { lastUploaded: req.body.time };

    Board.findByIdAndUpdate(id, newvalues, function (err, response) {
        if (err) {
            res.json({ success: false, message: "Error updating data" });
        } else {
            res.json({ success: true, message: "Data updated" });
        }
    });
};

module.exports.getBoards = function (req, res) {
    let id = new mongoose.Types.ObjectId(req.params.id);
    //console.log("User id is: " + req.params.id);
    const mysort = { lastUploaded: -1 }; //descending order
    Board.find({ owner_id: id }, function (err, boards) {
        if (err) {
            res.json({ success: false, message: `Failed to load all boards. Error: ${err}` });
        }
        // Return if boards was found in database
        if (boards) {
            res.write(JSON.stringify({ success: true, boards: boards }, null, 2));
            res.end();
        } else {
            res.json({ success: false, message: `Failed to load all boards. Error: ${err}` });
        }
    }).sort(mysort);
};

module.exports.getBoard = function (req, res) {
    let id = new mongoose.Types.ObjectId(req.params.id);
    console.log("id is: " + req.params.id);
    Board.findById({ _id: id }, function (err, boards) {
        if (err) {
            return res.status(400).json({ success: false, message: `Failed to load all boards. Error: ${err}` });
        }
        // Return if boards was found in database
        if (boards) {
            //console.log(JSON.stringify({ success: true, boards: boards }, null, 2));
            res.status(200).write(JSON.stringify({ boards }, null, 2));
            res.end();
        } else {
            return res.json({ success: false, message: `Failed to find boards. Error: ${err}` });
        }
    });
};

module.exports.addCard = function (req, res) {

    let card = new Card();

    card.name = String(req.body.name);
    card.description = String(req.body.description);
    card.label = parseInt(req.body.label);
    card.board_id = String(req.body.board_id);

    card.save(function (err, result) {
        if (err) {
            response = { success: false, message: "Error adding data" };
        } else {
            response = { success: true, message: "Data added", cards: result };
        }
        res.json(response);
    });
};

module.exports.getCards = function (req, res) {
    const mysort = { _id: -1 }; //descending order
    let id = String(req.params.id);
    //console.log("id is: " + req.params.id);
    Card.find({ board_id: id }, function (err, cards) {
        if (err) {
            return res.status(400).json({ success: false, message: `Failed to load all cards. Error: ${err}` });
        }
        // Return if cards was found in database
        if (cards) {
            //console.log(JSON.stringify({ success: true, cards: cards }, null, 2));
            res.status(200).write(JSON.stringify({ cards }, null, 2));
            res.end();
        } else {
            return res.json({ success: false, message: `Failed to find cards. Error: ${err}` });
        }
    }).sort(mysort);
};