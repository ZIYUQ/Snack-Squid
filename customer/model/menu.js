const mongoose = require('mongoose')
const db = require('../db')

// menu model
const menuSchema = new mongoose.Schema({
    name: {type:String, require:true},
    price:{type: Number, require:true},
    photo:String,
    type: String,
    description: String
})
const menu = mongoose.model("menu", menuSchema)


module.exports = {menu}