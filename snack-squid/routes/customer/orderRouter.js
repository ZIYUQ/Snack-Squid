const express = require("express")
const utilities = require("./utility")
const orderRouter = express.Router()
const orderController = require("../../controllers/customer/orderController")
const menuController = require('../../controllers/customer/menuController')

// show all orders for the customer
orderRouter.get('', utilities.isLoggedIn, (req, res) => orderController.getOrder(req, res))

// render to menu page if change order
orderRouter.get('/changeorder?orderid=:orderid', menuController.getMenu)

// replace the change order
orderRouter.post('/changeorder?orderid=:orderid/place-order', orderController.placeOrder)

// update cancel order 
orderRouter.get('/cancelorder?orderid=:orderid', orderController.cancelOrder)

module.exports = orderRouter