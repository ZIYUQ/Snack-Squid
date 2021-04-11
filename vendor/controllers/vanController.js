const vans = require('../models/van')

const getAllVans = (req, res) => {
    res.send(vans)
}

module.exports = {
    getAllVans,
}