const Van = require('../../model/van')

// find the van by its vanName 
const checkLocation = async(req, res) => {
    let ID = req.session.vanId;
    try {
        let thisVan = await Van.findOne({ _id: ID }, { open: true })
        if (thisVan['open'] === true) {
            return res.redirect('/vendor/order')
        } else {
            return res.render('vendor/open')
        }
    } catch (err) {
        console.log("Database query collection 'menu' failed!")
        return res.redirect('/404-NOT-FOUND')
    }
}

// find the van by name and change the value open as true
const openForBusiness = async(req, res) => {
    let ID = req.session.vanId;
    let location = req.body.location
    try {
        let thisVan = await Van.findOne({ _id: ID }, { open: true })
            // If req.body has nothing
            // If the van is not open yet, update the location and mark it as open
        if (updateLocation(ID, location, res)) {
            await Van.updateOne({ _id: ID }, { $set: { open: true } })
            res.redirect('/vendor/order')
        } else {
            return res.send('no location')
        }

    } catch (err) {
        console.log("Database query collection 'menu' failed!")
        return res.redirect('/404-NOT-FOUND')
    }
}

// Update the location
const updateLocation = async(ID, vanLocation, res) => {
    try {
        // Find the van and set the location value
        await Van.updateOne({ _id: ID }, { $set: { textLocation: vanLocation } })
        return 1
    } catch (err) {
        console.log("Database query collection 'menu' failed!")
        return res.redirect('/404-NOT-FOUND')
    }
}

const updategeoLocation = async(req, res) => {
    ID = req.session.vanId
    try {
        let thisVan = await Van.findOne({ _id: ID }, { open: true })
        geoLocation = req.body;
        await Van.updateOne({ _id: ID }, { $set: { location: geoLocation } })
    } catch (err) {
        console.log("Database query collection 'menu' failed!")
        return res.redirect('/404-NOT-FOUND')
    }
}

module.exports = {
    checkLocation,
    openForBusiness,
    updateLocation,
    updategeoLocation
}