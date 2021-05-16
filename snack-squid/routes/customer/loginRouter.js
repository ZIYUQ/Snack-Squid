const express = require("express")

const passport = require('passport');
require('../../config/passport')(passport);

const loginRouter = express.Router()
const customerController = require("../../controllers/customer/customerController")

// render to login page
loginRouter.get('/', customerController.renderLoginPage)

loginRouter.post('/', passport.authenticate('customer-login', {
    successRedirect: '/customer/menu/van=SnackSquid',
    failureRedirect: '/customer/login', // redirect back to the login page if there is an error
    failureFlash: true // allow flash messages
}));


module.exports = loginRouter