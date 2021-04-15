const { Order } = require('../models/van')
const getAllOrder = async(req, res) => {
    result = Order.find({ van_name: req.params.name })
    if (result) {
        res.send(result)
    } else {
        res.send('<h1>you have no order yet</h1>')
    }
}

module.exports = { getAllOrder }