const { Order } = require('../models/van')

const getVanOrder = async(req, res) => {
    try {
        result = await Order.find({ van_name: req.params.van_name, fulfilled: false }, {})
        if (result) {
            return res.send(result)
        } else {
            return res.send('No order available')
        }
    } catch (err) {
        return res.status(400).send('Database query failed')
    }
}

const getAllOrder = async(req, res) => {
    try {
        result = await Order.find({}, {})
        if (result) {
            return res.send(result)
        } else {
            return res.send('No order available')
        }
    } catch (err) {
        return res.status(400).send('Database query failed')
    }
}

const fulfillOrder = async(req, res) => {
    try {
        await Order.updateOne({ _id: req.body._id }, { $set: { fulfilled: req.body.fulfilled } })
        return res.send('fulfilled')
    } catch (err) {
        return res.status(400).send('Database query failed')
    }
}

module.exports = { getVanOrder, getAllOrder, fulfillOrder }