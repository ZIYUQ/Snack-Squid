const express = require("express")

const profileRouter = express.Router()
const customerController = require("../../controllers/customer/customerController")

profileRouter.get('', customerController.renderProfilePage)

profileRouter.get('/logout', customerController.logout)

module.exports = profileRouter