const express = require("express")

const orderRouter = express.Router()
const orderController = require("../../controllers/customer/orderController")

orderRouter.get('', orderController.getOrder)

module.exports = orderRouter