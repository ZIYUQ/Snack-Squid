const ObjectId = require('mongoose').Types.ObjectId;
const { Order } = require("../../model/order")
const { Menu } = require("../../model/menu")

// params: [{food_id}, {quantity}]
const placeOrder = async(req, res) =>{
        let totalPrice = 0
        let cart = req.body
        // get food price and calculate the total price
        for (let i=0; i < cart.length; i++){
            // get the food price
            let foodId = new ObjectId(cart[i]["foodId"])
            let foodDetails = await Menu.findOne({ _id: foodId }, { foodName: true, price:true })
            cart[i]["foodName"] = foodDetails.foodName
            cart[i]["price"] = foodDetails.price
            totalPrice += cart[i]["price"] * cart[i]["quantity"]
        }

        // create new order
        const newOrder = new Order({
            van_name: "Peter",
            givenName: "Cathy",
            familyName: "Yu",
            emailAddress: "email@address.com",
            details: cart,
            total: totalPrice,
            status: "preparing"
        })


        // push order to database
        newOrder.save((err, result) => {
            if (err){
                console.log("failed to send order!")
                return res.send("failed to send order!")
            }
            console.log("order sent successfully!")
            return res.send(newOrder)
        })
}

module.exports = { placeOrder }