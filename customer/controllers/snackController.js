const mongoose = require("mongoose")

const { menu } = require('../model/order')

// get menu
const getMenu = async(req, res) => {
    try {
        result = await menu.find({}, { name: true, price: true, photo: true, _id: false })
        res.send()
    } catch (err) {
        res.status(400)
        res.send("error")
    }
}

const getSnackDetail = async(req, res) => {
    try {
        const result = await menu.findOne({ name: req.params.snack }, { name: true, description: true, _id: false })
        if (result === null) {
            res.send(404)
            return res.send("food not found")
        }
        return res.send(result)
    } catch (err) {
        res.status(400)
        res.send("error")
    }

}

module.exports = { getMenu, getSnackDetail }