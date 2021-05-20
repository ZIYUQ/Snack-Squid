const express = require('express')
const profileRouter = express.Router()

const profileController = require('../../controllers/vendor/profileController')
profileRouter.get('/logout', profileController.logout)

profileRouter.post('/chage-location', profileController.changeLocation)

profileRouter.get('/close', profileController.close)

profileRouter.get('/', profileController.renderProfile)

module.exports = profileRouter