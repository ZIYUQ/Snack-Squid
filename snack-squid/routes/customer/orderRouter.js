const express = require("express")
const utilities = require("./utility")
const orderRouter = express.Router()
const orderController = require("../../controllers/customer/orderController")
const menuController = require('../../controllers/customer/menuController')


orderRouter.get('', utilities.isLoggedIn, (req, res) => orderController.getOrder(req, res))

orderRouter.get('/:orderid/:alter', orderController.alterOrder)

module.exports = orderRouter