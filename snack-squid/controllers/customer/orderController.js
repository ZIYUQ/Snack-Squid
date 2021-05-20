const ObjectId = require('mongoose').Types.ObjectId;
const { Customer } = require("../../model/customer")
const { Order } = require("../../model/order")
const { Menu } = require("../../model/menu")
const { Van } = require("../../model/van")

// params: [{food_id}, {quantity}]
const placeOrder = async(req, res) => {

    let cart = req.body
    // get food price and calculate the total price
    let totalPrice = 0
    for (let i = 0; i < cart.length; i++) {
        // get the food price
        let foodName = cart[i]["food_name"]
        try {
            let foodDetails = await Menu.findOne({ foodName: foodName }, { foodName: true, price: true })
            cart[i]["foodName"] = foodDetails.foodName
            cart[i]["price"] = foodDetails.price
        } catch (err) {
            console.log("Database query collection 'menu' failed!")
            return res.redirect('/404-NOT-FOUND')
        }
        totalPrice += cart[i]["price"] * cart[i]["quantity"]
    }

    // case that change order
    let orderid =req.params.orderid
    console.log(orderid)
    if (orderid){
        result = await Order.findOne({ _id: orderid }, {})
        console.log(result)

        if (result === null || result === undefined){
            return res.send("no order found")
        }
        const orderchange = {details: cart, total: totalPrice}

        await Order.findOneAndUpdate({_id: orderid}, orderchange, {new:true});
        console.log("order update successfully!")
        return res.redirect('/customer/order')
    
    }

    let customerId = req.session.userId
    let vanName = req.params.van_name

    // get customer details
    try {
        let customerDetail = await Customer.findOne({ _id: customerId }, { _id: true })
        if (customerDetail) {
            //pass
        } else {
            console.log("no such customer")
            return res.redirect('/404-NOT-FOUND')
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
            console.log("no such van")
            return res.redirect('/404-NOT-FOUND')
        }
    } catch (err) {
        console.log("Database query collection 'vans' failed!")
        return res.send("Database query collection 'vans' failed!")
    }

    
    // new order created
    const newOrder = new Order({
        vanId: vanId,
        customerId: customerId,
        details: cart,
        total: totalPrice,
        status: "preparing"
    })

    // push order to database
    await newOrder.save((err, result) => {
        if (err) {
            console.log("failed to save order to the database!")
            return res.redirect('/404-NOT-FOUND')
        }
        console.log("order sent successfully!")
        return res.redirect('/customer/order')
    })
}


// get all outstanding and fulfilled order
const getOrder = async(req, res) => {
    let userId = req.session.userId
    userId = new ObjectId(userId)
    try {
        // find customer detail
        const customer = await Customer.findOne({ _id: userId })
        // find order under that customer
        const outstanding = await Order.find({ customerId: customer._id, status: "preparing" }, {}).populate("vanId", "vanName-_id").lean()
        const fulfilled = await Order.find({ customerId: customer._id, status: "fulfilled" }, {}).populate("vanId", "vanName-_id").lean()
        for (let i = 0; i < outstanding.length; i++) {
            outstanding[i].details = JSON.stringify(outstanding[i].details);
        }
        

        for (let i = 0; i < fulfilled.length; i++) {
            fulfilled[i].details = JSON.stringify(fulfilled[i].details);
            
        }
        res.render('customer/showOrder', { "preparingOrders": outstanding, "completedOrders": fulfilled});
    } catch (err) {
        return res.redirect('/404-NOT-FOUND')
    }
}

const cancelOrder = async (req, res) => {
    let id = req.params.orderid
    if (id === undefined || id === null) {
        return res.send("no order found")
    }
    try {
        result = await Order.findOne({ _id: id }, {})
    
         // Set status as fulfilled
        await Order.updateOne({ _id: id }, { $set: { status: 'cancelled' } })
        console.log("cancel order successfully!")
        return res.redirect('/customer/order')
       
    } catch (err) {
        return res.status(400).send('Database query failed')
    }
}


module.exports = { placeOrder, getOrder, cancelOrder}