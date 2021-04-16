const { Order } = require('../models/van')
const orderRouter = require('../routes/orderRoutes')

const getVanOrder = async(req, res) => {
    try {
        result = await Order.find({ van_name: req.params.van_name, status: "preparing" }, {})
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
    let id = req.body._id
    if (id === undefined || id === null) {
        res.send("no order found")
    }
    try {
        result = await Order.findOne({ _id: id }, {})
        if (result) {
            await Order.updateOne({ _id: id }, { $set: { status: 'ready' } })
            res.send('fulfilled')
        } else {
            res.send('no order found')
        }
    } catch (err) {
        return res.status(400).send('Database query failed')
    }
}

module.exports = { getVanOrder, getAllOrder, fulfillOrder }