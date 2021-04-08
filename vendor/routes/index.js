const express = require('express')
    //add vanRouter
const indexRouter = express.Router()

// require the van controller
indexRouter.get('/', (req, res) => {
    res.render('welcome')
})


indexRouter.get('/register', (req, res) => {
    res.render('register')
})

module.exports = indexRouter