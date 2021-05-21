const Van = require('../../model/van')

const logout = async(req, res) => {
    req.logout()
    console.log('logout successfully')
    return res.redirect('/vendor/')
}

const close = async(req, res) => {
    let ID = req.session.vanId;
    try {
        let thisVan = await Van.findOne({ _id: ID })
        if (thisVan['open'] === true) {
            geolocation = {
                'latitude': 0.0,
                'longitude': 0.0
            }
            await Van.updateOne({ _id: ID }, { $set: { textLocation: "", open: false, location: geolocation } })

            req.logout()
            return res.redirect('/vendor/')
        } else {
            return res.redirect('/vendor/profile')
        }
    } catch (err) {
        res.send(err)
    }
}

const changetextLocation = async(req, res) => {
    let ID = req.session.vanId;
    let newLocation = req.body.newLocation
    console.log(newLocation)
    try {
        let thisVan = await Van.findOne({ _id: ID })
        if (thisVan['open'] === true) {
            await Van.updateOne({ _id: ID }, { $set: { textLocation: newLocation } })
            console.log('change location')
        }
        res.redirect('/vendor/order')
    } catch (err) {
        res.status(400).send('Database query failed')
    }
}

const renderProfile = (req, res) => {
    let ID = req.session.vanId;
    let thisVan = Van.findOne({ _Id: ID });
    res.render('vendor/profile', { 'Van': thisVan })
}

const changeLocation = async(req, res) => {
    ID = req.session.vanId
    let thisVan = await Van.findOne({ _id: ID }, { open: true })
    geoLocation = req.body;
    await Van.updateOne({ _id: ID }, { $set: { location: geoLocation } })

    res.send(thisVan)
}
module.exports = { logout, close, changetextLocation, renderProfile, changeLocation }