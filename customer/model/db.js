
const mongoose = require("mongoose")


// menu model
const menuSchema = new mongoose.Schema({
    name: {type:String, require:true},
    price:{type: Number, require:true},
    phote:String,
    type: String,
    description: String
})

const menu = mongoose.model("menu", menuSchema)
module.exports = {menu}