const Order = require('../../model/order')
const Van = require('../../model/van')



const getPreparingOrder = async(req, res) => {

    try {
        const result = await Order.find({ vanId: req.session.vanId, status: "preparing" }, { _id: true, details: true }).populate("customerId", "givenName-_id")
            // Return if the order status is preparing

        if (result) {
            return res.send(result)
        } else {
            return res.send('No order available')
        }
    } catch (err) {
        res.send(err)
    }
}

const getFulfilledOrder = async(req, res) => {

    try {
        const result = await Order.find({ vanId: req.session.vanId, status: "fulfilled" }, { _id: true, details: true }).populate("customerId", "givenName-_id")
            // Return if the order status is preparing

        if (result) {
            return res.send(result)
        } else {
            return res.send('No order available')
        }
    } catch (err) {
        res.send(err)
    }
}

const getCompleteOrder = async(req, res) => {
    const datetime = new Date();
    try {
        const result = await Order.find({ vanId: req.session.vanId, status: "complete" }, { _id: true, details: true }).populate("customerId", "givenName-_id")
            // Return if the order status is preparing

        if (result) {
            return res.send(result)
        } else {
            return res.send('No order available')
        }
    } catch (err) {
        res.send(err)
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

// Fulfill the order 
const fulfillOrder = async(req, res) => {
    let id = req.body._id
        // Find the order to be fulfilled by the order id
    if (id === undefined || id === null) {
        return res.send("no order found")
    }
    try {
        result = await Order.findOne({ _id: id }, {})
        if (result) {
            // Set status as fulfilled
            await Order.updateOne({ _id: id }, { $set: { status: 'fulfilled' } })
            return res.send('fulfilled')
        } else {
            return res.send('no order found,please enter order id')
        }
    } catch (err) {
        return res.status(400).send('Database query failed')
    }
}

const completeOrder = async(req, res) => {
    let id = req.body._id
        // Find the order to be fulfilled by the order id
    if (id === undefined || id === null) {
        return res.send("no order found")
    }
    try {
        result = await Order.findOne({ _id: id }, {})
        if (result) {
            // Set status as fulfilled
            await Order.updateOne({ _id: id }, { $set: { status: 'complete' } })
        } else {
            return res.send('no order found,please enter order id')
        }
    } catch (err) {
        return res.status(400).send('Database query failed')
    }
}
module.exports = { getPreparingOrder, getFulfilledOrder, getCompleteOrder, fulfillOrder, completeOrder }