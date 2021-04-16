const { Order } = require("../model/order")

const placeOrder = async(req, res) => {
    const newOrder = new Order({
        van_name: req.body.van_name,
        given_name: req.body.given_name,
        family_name: req.body.family_name,
        email_address: req.body.email_address,
        details: req.body.details,
        total: req.body.total
    })
    newOrder.save((err, result) => {
        //callback-style error-handler
        if (err) res.send(err)
        return res.send(result)
    })
}

module.exports = { placeOrder }
