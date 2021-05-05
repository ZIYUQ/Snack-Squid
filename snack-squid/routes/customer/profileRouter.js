const express = require("express")
const utilities = require("./utility");
const profileRouter = express.Router()
const customerController = require("../../controllers/customer/customerController")

profileRouter.get('', utilities.isLoggedIn, (req, res) => customerController.renderProfilePage(req, res))

profileRouter.get('/logout', customerController.logout)

module.exports = profileRouter