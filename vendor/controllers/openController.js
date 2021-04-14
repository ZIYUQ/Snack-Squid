const { Van } = require('../models/van')
const db = require('../db')

// print all vans that are open
const findAllOpen = async(req, res) => {
    result = await Van.find({ open: true }, {})
    res.send(result)
}

// find the van by name and change the value open as true
const openForBusiness = async(req, res) => {
    try {
        let thisVan = await Van.findOne({ name: req.params.name }, { open: true })
        if (req.body === null) {
            return res.send("you have to enter location")
        } else {
            if (req.body.location === "" || req.body.location === null) {
                return res.send("you have to enter location")
            } else {
                if (thisVan['open'] === false) {
                    if (updateLocation(req.params.name, req.body.location, res)) {
                        await Van.updateOne({ name: req.params.name }, { $set: { open: true } })
                        return res.send('Order')
                    } else {
                        return res.send('no location')
                    }
                } else {
                    res.send('Has open')
                }
            }
        }

    } catch (err) {
        res.status(400).send('Database query failed')
    }
}


const updateLocation = async(van_name, van_location, res) => {
    try {
        await Van.updateOne({ name: van_name }, { $set: { location: van_location } })
        return true
    } catch (err) {
        res.status(400).send('Database query failed')
    }
}

const closeForBusiness = async(req, res) => {
    try {
        let thisVan = await Van.updateOne({ name: req.params.name }, { $set: { open: false } })
    } catch (err) {
        res.status(400).send('Database query failed')
    }
}


module.exports = {
    findAllOpen,
    openForBusiness,
    closeForBusiness,
    updateLocation
}