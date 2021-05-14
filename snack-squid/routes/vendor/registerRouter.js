const express = require('express')
const registerRouter = express.Router()
const vanController = require('../../controllers/vendor/vanController')


const passport = require('passport');
require('../../config/passportVD')(passport);


registerRouter.post('/', passport.authenticate('local-signup', {
    successRedirect: '/vendor/', // redirect to the homepage
    failureRedirect: '/customer/signup/', // redirect to signup page
    failureFlash: true // allow flash messages
}))


module.exports = registerRouter