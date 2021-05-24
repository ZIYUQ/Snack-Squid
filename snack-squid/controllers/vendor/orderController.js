const Order = require('../../model/order')
const Van = require('../../model/van')
const ObjectId = require('mongoose').Types.ObjectId;





const getOrder = async(req, res) => {
    let vanId = req.session.vanId
    vanId = new ObjectId(vanId)
    try {
        // find van detail
        const van = await Van.findOne({ _id: vanId })
            // find order under that customer
        const outstanding = await Order.find({ vanId: van._id, status: "preparing" }, {}).sort({ '_id': -1 }).populate("customerId", "givenName-_id").lean()
        const fulfilled = await Order.find({ vanId: van._id, status: "fulfilled" }, {}).populate("customerId", "givenName-_id").lean()
        const completed = await Order.find({ vanId: van._id, status: "completed" }, {}).populate("customerId", "givenName-_id").lean()

        for (let i = 0; i < outstanding.length; i++) {
            outstanding[i].details = JSON.stringify(outstanding[i].details);
        }

        for (let i = 0; i < fulfilled.length; i++) {
            fulfilled[i].details = JSON.stringify(fulfilled[i].details);

        }
        for (let i = 0; i < fulfilled.length; i++) {
            completed[i].details = JSON.stringify(completed[i].details);

        }
        res.render('vendor/order', { "preparingOrders": outstanding, "completedOrders": fulfilled, "completed": completed });
    } catch (err) {
        return res.redirect('/404-NOT-FOUND')
    }
}

// Fulfill the order 
const fulfillOrder = async(req, res) => {
    let id = req.body.orderId
    console.log(id)
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
module.exports = { getOrder, fulfillOrder, completeOrder }