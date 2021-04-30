const express = require("express")

const router = express.Router()
const loginController = require("../../controllers/customer/loginController")

router.get('', loginController.renderPage)

// customer login
router.post('', loginController.login)

module.exports = router