const mongoose = require("mongoose")

const { menu } = require('../model/order')

// get menu
const getMenu = async(req, res) => {
    try {
        result = await menu.find({}, { name: true, price: true, photo: true, _id: false })
        return res.send(result)
    } catch (err) {
        return res.status(400).send("error")
    }
}

const getMenuDetails = async(req, res) => {
    try {
        const result = await menu.findOne({ name: req.params.snack }, { name: true, description: true, _id: false })
        if (result === null) {
            res.send(404)
            return res.send("food not found")
        }
        return res.send(result)
    } catch (err) {
        return res.status(400).send("error")
    }
}

module.exports = { getMenu, getMenuDetails }