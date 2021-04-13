const { Van } = require('../models/van')
const db = require('../db')

// find the van by name

// return all teh van
const getAllVan = async(req, res) => {
        result = await Van.find({}, { name: true, _id: false })
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
        //callback-style error-handler
        if (err) res.send(err)
        return res.send(result)
    })
}

const getVanById = async(req, res) => {
    result = await Van.findOne({ _id: req.params.id }, {})
    if (result) {
        res.send(result)
    } else {
        res.send('<h1> no such van </h1>')
    }
}

const getVanByNameAndPassword = async(req, res) => {
    result = await Van.findOne({
        name: req.params.name,
        password: req.params.password
            //password: req.params.password
    }, {})

    if (result) {
        res.send(result)
    } else {
        res.send('<h1> no such van </h1>')
    }
}

const getVanByName = async(req, res) => {
    result = await Van.find({
        name: req.params.name
    }, {})
    if (result) {
        res.send(result)
    } else {
        res.send('<h1> no such van </h1>')
    }
}


module.exports = {
    getAllVan,
    addVan,
    getVanById,
    getVanByName,
    getVanByNameAndPassword
}