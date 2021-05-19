const { Van } = require('../../model/van')

const logout = async(req, res) => {
    req.logout()
    close(req, res)
    console.log('logout successfully')
    return res.redirect('/vendor/')
}

const close = async(req, res) => {
    let ID = req.session.vanId;
    try {
        let thisVan = await Van.findOne({ _id: ID })
        thisVan['location'] = ""
        thisVan['open'] = false
    } catch (err) {
        res.status(400).send('Database query failed')
    }
}

const changeLocation = async(req, res) => {
    let ID = req.session.vanId;
    let newLocation = req.bosy.newLocation
    try {
        let thisVan = await Van.findOne({ _id: ID })
        if (thisVan['open'] === true) {
            Van.updateOne({ _id: ID }, { $set: { location: newLocation } })
        }
    } catch (err) {
        res.status(400).send('Database query failed')
    }
}

const renderProfile = (req, res) => {
    res.render('vendor/profile')
}
module.exports = { logout, close, changeLocation, renderProfile }