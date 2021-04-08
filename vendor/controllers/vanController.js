const vans = require('../models/van')

const getAllVans = (req, res) => {
    res.send(vans)
}

const addVan = (req, res) => {
    const van = req.body
    vans.push(van)
    res.send(vans)
}

module.exports = {
    getAllVans,
    addVan
}