const ObjectId = require('mongoose').Types.ObjectId;
const { Customer } = require("../../model/customer")
const { Order } = require("../../model/order")
const { Menu } = require("../../model/menu")
const { Van } = require("../../model/van")

// params: [{food_id}, {quantity}]
const placeOrder = async(req, res) => {
    let emailAddress = req.body.emailAddress
    let vanName = req.body.vanName
    let cart = req.body.cart

    // get customer details
    let customerId
    let givenName
    let familyName
        // try{
        //     let customerDetails = await Customer.findOne({ emailAddress: emailAddress }, { givenName: true, familyName: true })
        //     customerId = customerDetails._id
        //     givenName = customerDetails.givenName
        //     familyName = customerDetails.familyName
        // } catch (err){
        //     console.log("Database query collection 'customers' failed!")
        //     return res.send("Database query collection 'customers' failed!")
        // }

    try {
        let customerDetail = await Customer.findOne({ emailAddress: emailAddress }, { _id: true })
        if (customerDetail) {
            customerId = customerDetail._id
        } else {
            return res.send("no such customer")
        }
    } catch (err) {
        console.log("Database query collection 'customers' failed!")
        return res.send("Database query collection 'customers' failed!")
    }

    // get van details
    let vanId
    try {
        let vanDetails = await Van.findOne({ vanName: vanName }, { _id: true })
        if (vanDetails) {
            vanId = vanDetails._id
        } else {
            return res.send("no such van")
        }
    } catch (err) {
        console.log("Database query collection 'vans' failed!")
        return res.send("Database query collection 'vans' failed!")
    }

    // get food price and calculate the total price
    let totalPrice = 0
    for (let i = 0; i < cart.length; i++) {
        // get the food price
        let foodTag = cart[i]["foodTag"]
        try {
            let foodDetails = await Menu.findOne({ tag: foodTag }, { foodName: true, price: true })
            cart[i]["foodName"] = foodDetails.foodName
            cart[i]["price"] = foodDetails.price
        } catch (err) {
            console.log("Database query collection 'menu' failed!")
            return res.send("Database query collection 'menu' failed!")
        }
        totalPrice += cart[i]["price"] * cart[i]["quantity"]
    }

    // // create new order
    // const newOrder = new Order({
    //     van: {
    //         vanId: vanId,
    //         vanName: vanName
    //     },
    //     customer: {
    //         customerId: customerId,
    //         givenName: givenName,
    //         familyName: familyName,
    //         emailAddress: emailAddress
    //     },
    //     details: cart,
    //     total: totalPrice,
    //     status: "preparing"
    // })

    const newOrder = new Order({
        vanId: vanId,
        customerId: customerId,
        details: cart,
        total: totalPrice,
        status: "preparing"
    })

    // push order to database
    newOrder.save((err, result) => {
        if (err) {
            console.log("failed to save order to the database!")
            return res.send(err)
        }
        console.log("order sent successfully!")
        return res.send(newOrder)
    })
}

module.exports = { placeOrder }