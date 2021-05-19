const express = require('express')
const orderRouter = express.Router()
const orderController = require('../../controllers/vendor/orderController')



orderRouter.get('/', orderController.getPreparingOrder)

orderRouter.post('/', orderController.fulfillOrder)
module.exports = orderRouter