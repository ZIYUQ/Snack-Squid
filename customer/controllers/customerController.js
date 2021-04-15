const mongoose = require("mongoose")

const { Customer } = require("../model/order")

// const db = require('../model/index')

// get all user
const getAllCustomer = async(req, res) => {
    try {
        const allCustomer = await Customer.find()
        return res.send(allCustomer)
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

// get user info
const getCustomerByName = async(req, res) => {
    try {
        const user = await Customer.findOne({ givenName: req.params.givenName }, { givenName: true, email_address: true, _id: false })
        if (user === null) {
            res.status(404)
            return res.send("New user? Sign up now!")
        }
        return res.send(user)
    } catch (err) {
        return res.status(400).send("error")
    }
}

// add new customer
const addNewCustomer = async(req, res) => {
    try {
        const newUser = new Customer({
            givenName: req.body.givenName,
            familyName: req.body.familyName,
            email_address: req.body.email_address,
            password: req.body.password
        })
        await newUser.save(function(err) {
            if (err) console.log(err)
        })
        return res.send(newUser)

    } catch (err) {
        return res.status(400).send("insert data fail")
    }
}

module.exports = { getAllCustomer, getCustomerByName, addNewCustomer }