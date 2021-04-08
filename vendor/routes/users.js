const { Router } = require('express')
const express = require('express')
const userRouter = express.Router()

userRouter.get('/login', (req, res) => {
    res.render('login')
})

userRouter.get('/register', (req, res) => {
    res.render('register')
})

userRouter.post('/register', (req, res) => {})

userRouter.post('/login', (req, res, next) => {

})

module.exports = userRouter