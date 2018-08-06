const passport = require('passport');
const mongoose = require('mongoose');
const Board = mongoose.model('Boards');
const profile = require('./profile');
const Card = mongoose.model('Cards');
const Item = mongoose.model('Items');

// BOARDS
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
            response = { success: true, message: "Board added", boards: result };
        }
        res.json(response);
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
    //console.log("id is: " + req.params.id);
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

//CARDS
module.exports.addCard = function (req, res) {

    //let card = new Card();

    let card = new Card({
        name: String(req.body.name),
        description: String(req.body.description),
        label: parseInt(req.body.label),
        board_id: String(req.body.board_id)
    });

    card.save(function (err, result) {
        if (err) {
            response = { success: false, message: "Error adding data" };
        } else {
            console.log(JSON.stringify({ success: true, cards: result, items: result.items }, null, 2));
            response = { success: true, message: "Data added", cards: result, items: result.items };
        }
        res.json(response);
    });
};

module.exports.getCards = function (req, res) {
    const mysort = { _id: -1 }; //descending order
    let id = String(req.params.id);
    //console.log("id is: " + req.params.id);
    Card.find({ board_id: id }, function (err, result) {
        if (err) {
            return res.status(400).json({ success: false, message: `Failed to load all cards. Error: ${err}` });
        }
        // Return if cards was found in database
        if (result) {
            //let text = result.items.toString();
            //console.log(JSON.stringify({ success: true, cards: result }, null, 2));
            res.status(200).write(JSON.stringify({ cards: result, items: result.items }, null, 2));
            res.end();
        } else {
            return res.json({ success: false, message: `Failed to find cards. Error: ${err}` });
        }
    }).sort(mysort);
};

module.exports.removeCard = function (req, res) {
    let card_id = new mongoose.Types.ObjectId(req.params.card_id);
    //console.log("Card id is: " + req.params.card_id);
    Card.deleteOne({ _id: card_id }, function (err, card) {
        if (err) {
            return res.status(400).json({ success: false, message: `Failed to delete card. Error: ${err}` });
        } else {
            return res.status(200).json({ success: true, message: `Card was deleted successfully` });
        }
    });
};

//ITEMS
module.exports.addItem = function (req, res) {
    let id = new mongoose.Types.ObjectId(req.body.card_id);
    console.log("Passed text: " + req.body.text);

    Card.findById({ _id: id }, function (err, card) {
        if (err) {
            return res.status(400).json({ success: false, message: `Failed to load all boards. Error: ${err}` });
        }
        // Return if boards was found in database
        if (card) {
            card.items.unshift({
                text: String(req.body.text),
                label: String(req.body.label),
                assigned_user: String(req.body.assigned_user)
            });
            card.save(function (err, result) {
                if (err) {
                    response = { success: false, message: "Error adding item" };
                } else {
                    response = { success: true, message: "Item added" };
                }
                res.json(response);
            });
        } else {
            return res.json({ success: false, message: `Failed to find boards. Error: ${err}` });
        }
    });
};

module.exports.removeItem = function (req, res) {
    let card_id = new mongoose.Types.ObjectId(req.params.card_id);
    let item_id = new mongoose.Types.ObjectId(req.params.item_id);
    console.log("Card id is: " + req.params.card_id);
    console.log("Item id is: " + req.params.item_id);
    Card.findById({ _id: card_id }, function (err, card) {
        if (err) {
            return res.status(400).json({ success: false, message: `Failed to load the card. Error: ${err}` });
        }
        if (card) {
            card.items.id(item_id).remove();
            card.save(function (err, result) {
                if (err) {
                    response = { success: false, message: "Error removing item" };
                } else {
                    response = { success: true, message: "Item was removed" };
                }
                res.json(response);
            });
        } else {
            return res.json({ success: false, message: `Failed to find boards. Error: ${err}` });
        }
    });
};

