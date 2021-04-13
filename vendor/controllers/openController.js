const { Van } = require('../models/van')
const db = require('../db')
const vans = db.collection('Vans')
    // print all vans that are open
const findAllOpen = async(req, res) => {
    result = await Van.find({ open: true }, {})
    res.send(result)
}

// find the van by name and change the value open as true
const openForBusiness = async(req, res) => {
    const thisVan = await Van.find({ name: req.params.name }, {})
        //vans.updateOne({ name: req.params.name }, { $set: { open: true } })
    res.send(thisVan)
}

module.exports = {
    findAllOpen,
    openForBusiness,
}