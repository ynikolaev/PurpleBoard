const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('Users');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }

            // Return if user not found in database
            if (!user) {
                console.log("User not found");
                return done(null, false, {
                    message: 'User not found'
                });
            }
            // Return if password is wrong
            if (!user.validPassword(password)) {
                console.log("Password is wrong");
                return done(null, false, {
                    message: 'Password is wrong'
                });
            }
            console.log("Correct");
            // If credentials are correct, return the user object
            return done(null, user);
        });
    }
));