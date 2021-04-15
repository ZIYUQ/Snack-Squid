const { Order } = require('../models/order')

const placeOrder = async(req, res)=>{
    const newOrder = new Order({
        name: req.body.name
    })
    newOrder.save((err, result) => {
        //callback-style error-handler
        if (err) res.send(err)
        return res.send(result)})
}

module.exports = {
    placeOrder
}