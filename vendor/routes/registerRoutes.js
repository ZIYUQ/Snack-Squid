const express = require('express')
const registerRouter = express.Router()
const passport = require('passport');
require('../config/passport')(passport);

registerRouter.post('/', passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the homepage
    failureRedirect: '/register/', // redirect to signup page
    failureFlash: true // allow flash messages
}));

module.exports = registerRouter