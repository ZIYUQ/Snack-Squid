const { Router } = require('express')
const express = require('express')
const userRouter = express.Router()
const db = require('../db')
userRouter.get('/', function(req, res, next) {
    res.render('users-form')
})

const { Van } = require('../db')
userRouter.post('/register', async(req, res) => {
    const newVan = new Van({
        van_name: req.body.vanName,
        password: req.body.password
    })
    newVan.save((err, result) => {
        if (err) res.send(err)
        return res.send(result)
    })
})

module.exports = userRouter