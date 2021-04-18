const {Van} = require("../../model/van");
const closeForBusiness = async(req, res) => {
    try {
        await Van.updateOne({ name: req.params.name }, { $set: { open: false, location: "" } })
    } catch (err) {
        res.status(400).send('Database query failed')
    }
}