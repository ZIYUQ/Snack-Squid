const openForBusiness = (req, res) => {
    db.collection('Van').find(req.van_name)
    res.send('open for business')
}