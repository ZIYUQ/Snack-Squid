const ObjectId = require('mongoose').Types.ObjectId;
const { Customer } = require("../../model/customer")
const { Order } = require("../../model/order")
const { Menu } = require("../../model/menu")
const { Van } = require("../../model/van")

// params: [{food_id}, {quantity}]
const placeOrder = async(req, res) => {
    let customerId = new ObjectId(req.cookies['userId'])
    let vanName = req.params.van_name
    let cart = req.body
    console.log(req.params.van_name)

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

const getOrder = async (req,res)=>{
    let userId = req.cookies['userId']
    if (userId == undefined){
        return res.redirect('/customer/login')
    }
    userId = new ObjectId(userId)
    try{
        const customer = await Customer.findOne({_id: userId})
        const fulfilled = await Order.find({customerId: customer._id, status: "preparing"}, {}).populate("vanId", "vanName-_id").lean()
        const completed = await Order.find({customerId: customer._id, status: "completed"}, {}).populate("vanId", "vanName-_id").lean()
        for (let i=0; i < fulfilled.length; i++){
            fulfilled[i].details = JSON.stringify(fulfilled[i].details);
        }
        res.render('customer/showOrder', {"fulfilledOrders": fulfilled, "completedOrders": completed})
    }catch(err){
        return res.redirect('/404-NOT-FOUND')
    }
}


module.exports = { placeOrder, getOrder }