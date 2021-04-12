const express = require("express")

const customerRouter = express.Router()
const customerController = require('../controllers/customerController')

// get menu
customerRouter.get('/', customerController.getMenu)

// get detail of food
customerRouter.get('/:snack', customerController.getSnackDetail)


module.exports = customerRouter