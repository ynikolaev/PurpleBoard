const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('Users');

let sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.isEmailRegisterd = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            sendJSONresponse(res, 302, {
                "message": "Database Issue (auth: 15)"
            });
        }
        // Return if email was found in database
        if (user) {
            sendJSONresponse(res, 200, {
                "isEmailUnique": false
            });
        } else {
            sendJSONresponse(res, 200, {
                "isEmailUnique": true
            });
        }
    });
}

module.exports.register = function (req, res) {

    // if(!req.body.name || !req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    let user = new User();

    user.lastname = req.body.lastname;
    user.firstname = req.body.firstname;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function (err) {
        let token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });

};

module.exports.login = function (req, res) {

    passport.authenticate('local', function (err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            console.log("User found");
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            console.log("User not found");
            res.status(401).json(info);
        }
    })(req, res);

};