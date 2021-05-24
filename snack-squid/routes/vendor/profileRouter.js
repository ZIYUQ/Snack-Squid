const express = require('express')
const profileRouter = express.Router()
const utilities = require("./utility");
const profileController = require('../../controllers/vendor/profileController')
profileRouter.get('/logout', profileController.logout)

profileRouter.post('/change', profileController.changetextLocation)

profileRouter.get('/close', profileController.close)

profileRouter.get('/', profileController.renderProfile)

profileRouter.post('/', profileController.changeLocation)
module.exports = profileRouter