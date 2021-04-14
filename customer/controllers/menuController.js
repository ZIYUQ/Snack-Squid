const { Menu } = require('../models/menu')

const getAllMenu = async(req, res) => {
    let result = await Menu.find({}, {name: true, price: true, type: true})
    res.send(result)
}

const getDetails = async(req, res) => {
    let result = await Menu.find({name: req.params.name}, {})
    res.send(result)
}

module.exports = {
    getAllMenu,
    getDetails
}
