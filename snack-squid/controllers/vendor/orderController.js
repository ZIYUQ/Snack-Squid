const { Order } = require('../../model/order')
const { Van } = require('../../model/van')

// Find all outstanding order
// const getVanOrder = async(req, res) => {
//     try {
//         // Return if the order status is preparing
//         result = await Order.find({ vanName: req.params.vanName, status: "preparing" }, {})
//         if (result) {
//             return res.send(result)
//         } else {
//             return res.send('No order available')
//         }
//     } catch (err) {
//         return res.status(400).send('Database query failed')
//     }
// }


const getVanOrder = async(req, res) => {
    try {
        const van = await Van.findOne({vanName: req.params.vanName})
  
        const result = await Order.find({vanId: van._id, status: "preparing"},{}).populate("vanId","vanName -_id")
        // Return if the order status is preparing
        
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

module.exports = { getVanOrder, getAllOrder, fulfillOrder }