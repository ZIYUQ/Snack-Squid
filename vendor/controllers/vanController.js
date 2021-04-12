const { Van } = require('../models/van')
const db = require('../db')


// add new Van

const getAllVan = (req, res) => {
    db.collection('Vans').find().toArray((err, result) => {
        if (err) res.send(err)
        return res.send(result)
    })
}
module.exports = {
    getVanByName,
    getAllVan
}