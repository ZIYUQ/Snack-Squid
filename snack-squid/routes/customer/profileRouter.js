const express = require("express")
const utilities = require("./utility");
const profileRouter = express.Router()
const customerController = require("../../controllers/customer/customerController")

// render to profile page
profileRouter.get('', utilities.isLoggedIn, (req, res) => customerController.renderProfilePage(req, res))

// user logout 
profileRouter.post('/logout', customerController.logout)

module.exports = profileRouter