
const mongoose = require("mongoose")


// menu model
const menuSchema = new mongoose.Schema({
    name: {type:String, require:true},
    price:{type: Number, require:true},
    photo:String,
    type: String,
    description: String
})

const customerSchema = new mongoose.Schema({
    givenName: { type: String, required: true },
    familyName: { type: String, required: true},
    email_address: { type: String, required: true, unique: true },
    password: { type: String, required: true}
})

const menu = mongoose.model("menu", menuSchema)
const customer = mongoose.model("customer", customerSchema)
module.exports = {menu, customer}