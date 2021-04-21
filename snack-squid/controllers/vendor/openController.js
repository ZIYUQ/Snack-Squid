const { Van } = require('../../model/van')

// print all vans that are open


const findVanByName = async(req, res) => {
    try {
        result = await Van.findOne({ vanName: req.params.vanName }, { password: false })
        if (result) {
            return res.send(result)
        } else {
            return res.status(404).send("Van not found")
        }
    } catch (err) {
        return res.status(400).send("Database query failed")
    }
}

// find the van by name and change the value open as true
const openForBusiness = async(req, res) => {
    let name = req.params.vanName
    let location = req.body.location
    try {
        let thisVan = await Van.findOne({ vanName: name }, { open: true })
        if (req.body === null) {
            return res.send("you have to enter location")
        } else {
            if (location === "" || location === undefined) {
                return res.send("you have to enter location")
            } else {
                if (thisVan['open'] === false) {
                    if (updateLocation(name, location, res)) {
                        await Van.updateOne({ vanName: name }, { $set: { open: true } })
                        res.redirect('/vendor/order/name=' + name)
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


const updateLocation = async(vanName, van_location, res) => {
    try {
        await Van.updateOne({ vanName: vanName }, { $set: { location: van_location } })
        return 1
    } catch (err) {
        res.status(400).send('Database query failed')
        return 0
    }
}

const closeForBusiness = async(req, res) => {
    try {
        await Van.updateOne({ vanName: req.params.vanName }, { $set: { open: false, location: "" } })
    } catch (err) {
        res.status(400).send('Database query failed')
    }
}

module.exports = {
    findVanByName,
    openForBusiness,
    closeForBusiness,
    updateLocation
}