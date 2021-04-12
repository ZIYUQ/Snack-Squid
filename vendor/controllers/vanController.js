const { Van } = require('../models/van')
const db = require('../db')


// add new Van
const getVanByName = async(req, res) => {
    result = await Van.find({ name: req.body.name }, {})
    res.send(result)
}

const getAllVan = async(req, res) => {
    result = await Van.find({}, { name: true })
    res.send(result)
}

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