const renderLoginPage = (req, res) => {
    res.render('vendor/login')
}


const renderRegisterPage = (req, res) => {
    res.render('vendor/registration')
}
module.exports = { renderLoginPage, renderRegisterPage }