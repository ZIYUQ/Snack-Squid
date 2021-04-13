const { Van } = require('../models/van')
const db = require('../db')

// find the van by name
const getVanByName = async(req, res) => {
    result = await db.collection('Vans').findOne({ name: req.body.name })
    res.send(result)
}

// return all teh van
const getAllVan = async(req, res) => {
        result = await Van.find({})
        res.send(result)
    }
    // add new Van
const addVan = async(req, res) => { //usingPOSTforPostmandemo
    const newVan = new Van({
        name: req.body.name,
        password: req.body.password,
        email_address: req.body.email_address,
        mobile_number: req.body.mobile_number,
        location: null,
        open: false
    })
    newVan.save((err, result) => {
        //callback-styleerror-handler
        if (err) res.send(err)
        db.collection('Vans').insertOne(newVan)
    })
}

module.exports = {
    getVanByName,
    getAllVan,
    addVan
}