const express = require("express")

const menuRouter = express.Router()
const snackController = require('../controllers/menuController')

// get menu
menuRouter.get('/', snackController.getMenu)

// get detail of food
menuRouter.get('/:snack', snackController.getSnackDetail)

module.exports = menuRouter