const { menu } = require('../models/menu')

const getAllMenu = async(req, res) => {
    try{
        result = await menu.find({}, {name: true, price: true, _id:false})
        res.send(result)
    } catch(err){
        res.status(400)
        res.send("error")
    }
}

const getDetails = async(req, res) => {
    let result = await menu.find({name: req.params.name}, {})
    res.send(result)
}

module.exports = {
    getAllMenu,
    getDetails
}
