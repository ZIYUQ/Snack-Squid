const { Order } = require("../model/order")
const { Menu } = require("../model/menu")
const { Cart } = require("../model/order")
const { addNewCustomer } = require("./customerController")

// const placeOrder = async(req, res) => {
//     const newOrder = new Order({
//         van_name: req.body.van_name,
//         given_name: req.body.given_name,
//         family_name: req.body.family_name,
//         email_address: req.body.email_address,
//         details: req.body.details,
//         total: req.body.total
//     })
//     newOrder.save((err, result) => {
//         //callback-style error-handler
//         if (err) res.send(err)
//         return res.send(result)
//     })
// }

const placeOrder = async(req, res) =>{
    console.log(req.body)
    try{
        const newOrder = new Order({
            van_name: "Peter",
            given_name: "Cathy",
            family_name: "Yu",
            email_address: "email@address.com",
            status: "preparing"
        })
        
        var total_price = 0
        var i = 0
        
        // get food price and count the total pirce
        while (!(req.body[i] === undefined)){
            
            let foodorder = req.body[i]
            // get the food price
            foodprice = await Menu.findOne({food_name: req.body[i].food_name}, {price:true, _id: false})
           
            foodorder["price"] = foodprice.price

            // store the one food record in cart
            orderRecord = new Cart(foodorder)
            
            await newOrder.details.push(orderRecord)
            
            total_price += foodprice.price * orderRecord.quantity
            i += 1
        }

        // update the total price
        await newOrder.save()
        await Order.updateOne({_id:newOrder._id}, {$set: { total: total_price}})

        result = await Order.findOne({_id: newOrder._id})
        res.send(result)
    }catch(err){
        return res.status(400).send("error")
    }
}


module.exports = { placeOrder }