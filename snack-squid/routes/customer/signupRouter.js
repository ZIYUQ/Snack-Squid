const express = require("express")

const passport = require('passport');
require('../../config/passport')(passport);

const signupRouter = express.Router()
const customerController = require("../../controllers/customer/customerController")

// render to signup page
signupRouter.get('/', customerController.renderSignupPage)

signupRouter.post('/', passport.authenticate('customer-signup', {
    failureFlash: true, // allow flash messages
    failureRedirect: '/customer/signup/', // redirect to signup page
    successRedirect: '/customer/' // redirect to the homepage
}));

// customer login
//signupRouter.post('', customerController.signup)

module.exports = signupRouter