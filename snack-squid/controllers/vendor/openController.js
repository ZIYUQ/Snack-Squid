const { Van } = require('../../model/van')

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
        res.status(400).send('Database query failed')
    }
}

// find the van by name and change the value open as true
const openForBusiness = async(req, res) => {
    let ID = req.session.vanId;
    let location = req.body.location
    try {
        let thisVan = await Van.findOne({ _id: ID }, { open: true })
            // If req.body has nothing
        if (req.body === null) {
            return res.send("you have to enter location")
        } else {
            // If no location is entered
            if (location === "" || location === undefined) {
                return res.send("you have to enter location")
            } else {
                // If the van is not open yet, update the location and mark it as open
                if (thisVan['open'] === false) {
                    if (updateLocation(ID, location, res)) {
                        await Van.updateOne({ _id: ID }, { $set: { open: true } })
                        res.redirect('/vendor/order')
                    } else {
                        return res.send('no location')
                    }
                } else {
                    res.redirect('/vendor/order')
                }
            }
        }

    } catch (err) {
        res.status(400).send('Database query failed')
    }
}

// Update the location
const updateLocation = async(ID, vanLocation, res) => {
    try {
        // Find the van and set the location value
        await Van.updateOne({ _id: ID }, { $set: { location: vanLocation } })
        return 1
    } catch (err) {
        res.status(400).send('Database query failed')
        return 0
    }
}


module.exports = {
    checkLocation,
    openForBusiness,
    updateLocation
}