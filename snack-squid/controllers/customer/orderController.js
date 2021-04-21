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
            let foodTag = cart[i]["foodTag"]
            try {
                let foodDetails = await Menu.findOne({tag: foodTag}, {foodName: true, price: true})
                cart[i]["foodName"] = foodDetails.foodName
                cart[i]["price"] = foodDetails.price
            } catch (err) {
                return res.send("Database query failed!")
            }
            totalPrice += cart[i]["price"] * cart[i]["quantity"]
        }

        // create new order
        const newOrder = new Order({
            vanName: "SnackSquid",
            givenName: "Cathy",
            familyName: "Yu",
            emailAddress: "cathyu@gmail.com",
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