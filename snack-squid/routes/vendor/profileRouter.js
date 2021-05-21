const express = require('express')
const profileRouter = express.Router()
const utilities = require("./utility");
const profileController = require('../../controllers/vendor/profileController')
profileRouter.get('/logout', profileController.logout)

profileRouter.post('/', profileController.changeLocation)

profileRouter.get('/close', profileController.close)

profileRouter.get('/', utilities.isLoggedIn, (req, res) => profileController.renderProfile(req, res))

module.exports = profileRouter