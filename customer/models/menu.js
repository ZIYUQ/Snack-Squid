const mongoose = require('mongoose')
const db = require('../db')

// menu model
const menuSchema = new mongoose.Schema({
    foodId: { type: int },
    name: { type: String, require: true },
    description: String,
    photo: String,
    price: { type: Number, require: true },
    type: String,


})
const menu = mongoose.model("menu", menuSchema)

module.exports = { menu }