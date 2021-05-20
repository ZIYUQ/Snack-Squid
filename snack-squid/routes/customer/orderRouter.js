const express = require("express")
const utilities = require("./utility")
const orderRouter = express.Router()
const orderController = require("../../controllers/customer/orderController")

// show all orders for the customer
orderRouter.get('', utilities.isLoggedIn, (req, res) => orderController.getOrder(req, res))

// render to menu page if change order
orderRouter.get('/change/orderId=:orderId', orderController.renderChangeOrderPage)

// replace the change order
orderRouter.post('/change/orderId=:orderId', orderController.placeOrder)

// update cancel order 
orderRouter.get('/cancel/orderId=:orderId', orderController.cancelOrder)

module.exports = orderRouter