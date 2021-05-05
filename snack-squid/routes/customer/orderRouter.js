const express = require("express")

const orderRouter = express.Router()
const orderController = require("../../controllers/customer/orderController")
const menuController = require('../../controllers/customer/menuController')


orderRouter.get('', orderController.getOrder)

router.get('/:orderid/:alter', orderController.alterOrder)

module.exports = router
