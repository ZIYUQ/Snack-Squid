require('dotenv').config() // for JWT password key

// used to create our local strategy for authenticating
// using username and password
const LocalStrategy = require('passport-local').Strategy;
//const cookieParser = require('cookie-parser');
// our user model
const Customer = require('../model/customer');
const Van = require('../model/van');
// the following is required IF you wanted to use passport-jwt
// JSON Web Tokens
// const passportJWT = require("passport-jwt");
// const JwtStrategy = passportJWT.Strategy;
// const ExtractJwt = passportJWT.ExtractJwt;

module.exports = function(passport) {

    // these two functions are used by passport to store information
    // in and retrieve data from sessions. We are using user's object id
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(_id, done) {
        Customer.findById(_id, function(err, user) {
            done(err, user);
        });
    });


    // strategy to login
    // this method only takes in username and password, and the field names
    // should match of those in the login form
    passport.use('customer-login', new LocalStrategy({
            usernameField: 'emailAddress',
            passwordField: 'password',
            passReqToCallback: true
        }, // pass the req as the first arg to the callback for verification 
        function(req, emailAddress, password, done) {


            process.nextTick(function() {
                // see if the user with the emailAddress exists
                Customer.findOne({ 'emailAddress': emailAddress }, function(err, user) {
                    // if there are errors, user is not found or password
                    // does match, send back errors
                    if (err)
                        return done(err);
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found.'));

                    if (!user.validPassword(password)) {
                        // false in done() indicates to the strategy that authentication has
                        // failed
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                    // otherwise, we put the user's id in the session
                    else {
                        req.session.userId = user._id
                        console.log('User logged in: ', req.session.userId)

                        return done(null, user, req.flash('loginMessage', 'Login successful'));
                    }
                });
            });

        }));



    // for signup
    passport.use('customer-signup', new LocalStrategy({
            usernameField: 'emailAddress',
            passwordField: 'password',
            passReqToCallback: true
        }, // pass the req as the first arg to the callback for verification 

        function(req, emailAddress, password, done) {
            process.nextTick(function() {
                Customer.findOne({ 'emailAddress': emailAddress }, function(err, existingUser) {
                    // search a user by the username (emailAddress in our case)
                    // if user is not found or exists, exit with false indicating
                    // authentication failure
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    if (existingUser) {
                        console.log("Email address already registered!");
                        return done(null, false, req.flash('signupMessage', 'That emailAddress is already taken.'));
                    } else {
                        // otherwise
                        // create a new user
                        var newCustomer = new Customer();
                        newCustomer.givenName = req.body.givenName;
                        newCustomer.familyName = req.body.familyName;
                        newCustomer.emailAddress = emailAddress;
                        newCustomer.password = newCustomer.generateHash(password);
                        // and save the user
                        newCustomer.save(function(err) {
                            if (err)
                                throw err;

                            return done(null, newCustomer);
                        });

                        // put the user's ema  ilAddress in the session so that it can now be used for all
                        // communications between the client (browser) and the FoodBuddy app
                        req.session.userId = newCustomer._id;
                    }
                });
            });
        }));
    passport.use('van-login', new LocalStrategy({
            usernameField: 'vanName',
            passwordField: 'password',
            passReqToCallback: true
        }, // pass the req as the first arg to the callback for verification 
        function(req, vanName, password, done) {


            process.nextTick(function() {
                // see if the user with the emailAddress exists
                Van.findOne({ 'vanName': vanName }, function(err, user) {
                    // if there are errors, user is not found or password
                    // does match, send back errors
                    if (err)
                        return done(err);
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found.'));

                    if (!user.validPassword(password)) {
                        // false in done() indicates to the strategy that authentication has
                        // failed
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                    // otherwise, we put the user's id in the session
                    else {
                        req.session.vanId = user._id;
                        console.log(req.session.vanId)

                        return done(null, user, req.flash('loginMessage', 'Login successful'));
                    }
                });
            });

        }));
    passport.use('van-signup', new LocalStrategy({
            usernameField: 'vanName',
            passwordField: 'password',
            passReqToCallback: true
        }, // pass the req as the first arg to the callback for verification 

        function(req, vanName, password, done) {
            process.nextTick(function() {
                Van.findOne({ 'vanName': vanName }, function(err, existingUser) {
                    // search a user by the username (emailAddress in our case)
                    // if user is not found or exists, exit with false indicating
                    // authentication failure
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    if (existingUser) {
                        console.log("existing");
                        return done(null, false, req.flash('signupMessage', 'That van name is already taken.'));
                    } else {
                        // otherwise
                        // create a new user
                        const newVan = new Van();
                        newVan.vanName = vanName;
                        newVan.password = newVan.generateHash(password);
                        newVan.emailAddress = req.body.emailAddress;
                        newVan.mobileNumber = req.body.mobileNumber;
                        newVan.location['longitude'] = 0.0;
                        newVan.location['latitude'] = 0.0;
                        newVan.textLocation = '';
                        newVan.open = false;
                        // and save the user
                        newVan.save(function(err) {
                            if (err)
                                throw err;

                            return done(null, newVan);
                        });
                        // put the user's ema  ilAddress in the session so that it can now be used for all
                        // communications between the client (browser) and the FoodBuddy app
                        req.session.vanId = newVan._id;
                    }
                });
            });
        }));
}

// used to demonstrate JWT
//     let opts = {};
//     // extract token information
//     opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//     // key that was used to hash the token
//     opts.secretOrKey = process.env.PASSPORT_KEY;

//     // depending on what data you store in your token, setup a strategy
//     // to verify that the token is valid....
//     passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done) => {

//         // here I'm simply searching for a user with the emailAddress addr
//         // that was added to the token
//         Customer.findOne({ 'emailAddress': jwt_payload.body._id }, (err, user) => {

//             if (err) {
//                 return done(err, false);
//             }

//             if (user) {
//                 return done(null, user);
//             } else {
//                 return done(null, false);
//             }
//         });
//     }));

//     //Create a passport middleware to handle Customer login
//     passport.use('login', new LocalStrategy({
//         usernameField: 'emailAddress',
//         passwordField: 'password'
//     }, async(emailAddress, password, done) => {
//         try {
//             //Find the user associated with the emailAddress provided by the user
//             Customer.findOne({ 'emailAddress': emailAddress }, function(err, user) {

//                 if (err)
//                     return done(err);
//                 if (!user)
//                     return done(null, false, { message: 'No user found.' });

//                 if (!user.validPassword(password))
//                     return done(null, false, { message: 'Oops! Wrong password.' });


//                 else {
//                     return done(null, user, { message: 'Login successful' });
//                 }
//             });
//         } catch (error) {
//             return done(error);
//         }
//     }));

// };