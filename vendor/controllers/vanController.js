const { Van } = require('../models/van')
const db = require('../db')

// find the van by van_name

// return all teh van
const getAllVan = async(req, res) => {
        try {
            const vans = await Van.find({})
            return res.send(vans)
        } catch (err) {

            return res.status(400).send("Database query failed")
        }
    }
    // add new Van
const addVan = async(req, res) => { //usingPOSTforPostmandemo
    const newVan = new Van({
        van_name: req.body.van_name,
        password: req.body.password,
        email_address: req.body.email_address,
        mobile_number: req.body.mobile_number,
        location: "",
        open: false
    })
    newVan.save((err, result) => {
        //callback-style error-handler
        if (err) res.send(err)
        return res.send(result)
    })
}

// find van by id
const getVanById = async(req, res) => {
    try {
        const oneVan = await Van.findOne({
            _id: req.params.id
        })
        if (oneVan === null) {
            res.status(404)
            return res.send("Van not found")
        }
        return res.send(oneVan)
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

const getVanByNameAndPassword = async(req, res) => {
    try {
        const oneVan = await Van.findOne({
            van_van_name: req.params.van_van_name,
            password: req.params.password
        })
        if (oneVan === null) {
            res.status(404)
            return res.send("Van not found")
        }
        return res.send(oneVan)
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

const getVanByName = async(req, res) => {
    try {
        const oneVan = await Van.findOne({
            van_name: req.params.van_name
        })
        if (oneVan === null) {
            res.status(404)
            return res.send("Van not found")
        }
        return res.send(oneVan)
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

module.exports = {
    getAllVan,
    addVan,
    getVanById,
    getVanByName,
    getVanByNameAndPassword
}