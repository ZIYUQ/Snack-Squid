const { Order } = require('../../model/order')

const getVanOrder = async(req, res) => {
    try {
        result = await Order.find({ vanName: req.params.vanName, status: "preparing" }, {})
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
        return res.send("no order found")
    }
    try {
        result = await Order.findOne({ _id: id }, {})
        if (result) {
            await Order.updateOne({ _id: id }, { $set: { status: 'fulfilled' } })
            return res.send('fulfilled')
        } else {
            return res.send('no order found,please enter order id')
        }
    } catch (err) {
        return res.status(400).send('Database query failed')
    }
}

module.exports = { getVanOrder, getAllOrder, fulfillOrder }