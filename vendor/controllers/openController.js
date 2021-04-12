const { Van } = require('../models/van')
const openForBusiness = async(req, res) => {
    let thisVan = await Van.find({ name: req.body.name }, {})
    res.send(thisVan)
}

module.exports = { openForBusiness }