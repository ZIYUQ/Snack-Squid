const express = require("express")

const passport = require('passport');
require('../../config/passport')(passport);

const signupRouter = express.Router()
const customerController = require("../../controllers/customer/customerController")

// render to signup page
signupRouter.get('/', customerController.renderSignupPage)

signupRouter.post('/', passport.authenticate('local-signup', {
    successRedirect: '/customer/', // redirect to the homepage
    failureRedirect: '/customer/signup/', // redirect to signup page
    failureFlash: true // allow flash messages
}));
// customer login
//signupRouter.post('', customerController.signup)

module.exports = signupRouter