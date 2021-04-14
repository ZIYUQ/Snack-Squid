const mongoose = require("mongoose")

const menu = mongoose.model('menu')
const addcart = require('../model/cart')
// const cart = mongoose.model('cart')
const order = mongoose.model('order')

// add food in cart
const addToCart = async (req, res)=>{
    try{
        food = await menu.findOne({name: req.body.food})
        if (food === null){
            res.send(404)
            return res.send("food not found")
        }
        let orderfood = req.body
        addcart.push(orderfood)
        res.send(addcart)
    }catch(err){
        res.status(400)
        res.send("add to cart fail")
    }
}


const placeOrder = async(req, res)=>{
    try{
        // convert cart into order
        orderdetail = addcart
        const newOrder = new order({
            orderDetail: orderdetail
        })
        
        await order.save(function (err){
            if (err) console.log(err)
        })
        return res.send(newOrder)
        
    }catch(err){

        res.status(400)
        res.send("place order fail")
    }
   
}

module.exports = {addToCart, placeOrder}