const express = require("express")

const router = express.Router()
const customerController = require("../../controllers/customer/customerController")

router.get('', customerController.renderProfilePage)

router.get('/logout', customerController.logout)

module.exports = router