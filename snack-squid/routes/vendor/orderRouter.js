const express = require('express')
const orderRouter = express.Router()
const orderController = require('../../controllers/vendor/orderController')



orderRouter.get('/', orderController.getAllOrder)

orderRouter.post('/', orderController.fulfillOrder)
module.exports = orderRouter