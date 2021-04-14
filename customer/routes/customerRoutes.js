const express = require('express')
const controller = require('../controllers/customerController')
const path = require("path");

const router = express.Router()

router.get('/', controller.login)

router.get('/:id', (req, res) => {
    console.log((req.params.id))
})


module.exports = router