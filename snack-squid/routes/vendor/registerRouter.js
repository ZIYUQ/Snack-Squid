const express = require('express')
const registerRouter = express.Router()


const passport = require('passport');
require('../../config/passport')(passport);


registerRouter.post('/', passport.authenticate('van-signup', {
    successRedirect: '/vendor/', // redirect to the homepage
    failureRedirect: '/customer/signup/', // redirect to signup page
    failureFlash: true // allow flash messages
}))


module.exports = registerRouter