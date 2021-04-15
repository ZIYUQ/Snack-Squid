const express = require("express")

const menuRouter = express.Router()
const menuController = require('../controllers/menuController')

// get menu
menuRouter.get('/', menuController.getMenu)

// get detail of food
menuRouter.get('/:food', menuController.getMenuDetails)

module.exports = menuRouter