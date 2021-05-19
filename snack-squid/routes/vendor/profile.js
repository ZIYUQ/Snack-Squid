const express = require('express')
const profileController = ('../../controllers/vendor/profileController')

const profileRouter = express.Router()
profileRouter.get('/logout', profileController.logout)