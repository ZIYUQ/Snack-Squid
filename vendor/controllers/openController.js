const { Van } = require('../models/van')
const db = require('../db')

// print all vans that are open
const findAllOpen = async(req, res) => {
    result = await Van.find({ open: true }, {})
    res.send(result)
}

// find the van by name and change the value open as true
const openForBusiness = async(req, res) => {
    result = await Van.findOne({ _id: req.params.id }, { open: true })
    if (result['open']) {
        res.send('<h1>The van is open for business</h1>')
    } else {
        result['open'] = true
        res.send(result['open'])
    }
}

module.exports = {
    findAllOpen,
    openForBusiness
}