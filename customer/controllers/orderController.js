const { cart } = require("../model/cart")

const { menu } = require("../model/order")
const addcart = require('../model/cart')
const { order } = require("../model/order")

// add food in cart
const addToCart = async(req, res) => {
    try {
        addcart.push(req.body)
        res.send(addcart)

    } catch (err) {
        res.status(400)
        res.send("add to cart fail")
    }
}

const viewCart = (req, res) => {
    res.send(addcart)
}

const placeOrder = async(req, res) => {
    try {
        // convert cart into order
        const newOrder = new order({
            orderDetail: addcart
        })
        await newOrder.save(function(err) {
            if (err) console.log(err)
        })
        return res.send(newOrder)

    } catch (err) {
        res.status(400)
        res.send("place order fail")
    }

}

module.exports = { addToCart, placeOrder, viewCart }