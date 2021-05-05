const express = require("express")

const router = express.Router()
const orderController = require("../../controllers/customer/orderController")
const menuController = require('../../controllers/customer/menuController')


router.get('', orderController.getOrder)

router.get('/:orderid/:alter', orderController.alterOrder)

module.exports = router