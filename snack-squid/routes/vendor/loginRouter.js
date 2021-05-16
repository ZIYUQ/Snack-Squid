const express = require('express')
const loginRouter = express.Router()

const vanController = require('../../controllers/vendor/vanController')
const passport = require('passport');
require('../../config/passport')(passport);


loginRouter.post('/', passport.authenticate('van-login', {
    successRedirect: '/vendor/open-for-business/',
    failureRedirect: '/vendor/login', // redirect back to the login page if there is an error
    failureFlash: true // allow flash messages
}));

module.exports = loginRouter