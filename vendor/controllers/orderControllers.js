const { Order } = require('../models/van')
const getAllOrder = async(req, res) => {
    result = Order.find({ _id: req.params._id })
    if (result) {
        res.send(result)
    } else {
        res.send('<h1>you have no order yet</h1>')
    }
}

module.exports = { getAllOrder }