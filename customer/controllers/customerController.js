const mongoose = require("mongoose")

const menu = mongoose.model("menu")

const getMenu = async (req, res)=>{
    try{
        result = await menu.find({}, {name: true, price: true, _id:false})
        res.send(result)
    } catch(err){
        res.status(400)
        res.send("error")
    }

}

module.exports = {getMenu}
