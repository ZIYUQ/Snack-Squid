const express = require("express")

const snackRouter = express.Router()
const snackController = require('../controllers/snackController')

// get menu
snackRouter.get('/', snackController.getMenu)

// get detail of food
snackRouter.get('/:snack', snackController.getSnackDetail)

module.exports = snackRouter