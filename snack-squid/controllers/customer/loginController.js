const { Customer } = require('../../model/customer')

// express-validator, to validate user data in forms
const expressValidator = require('express-validator')

const renderPage = async(req, res) => {
    res.render('customer/login')
}

// check user and password
async function checkUser(emailAddress, password) {
    result = await Customer.findOne({ emailAddress: emailAddress }, { password: true } )
    if (result) {
        const match = await bcrypt.compare(password, result.password);
        if (match) {
            return 1
        } else {
            return -1
        }
    } else {
        return 0
    }
}

// Login
const login = async(req, res) => {
    emailAddress = req.body.emailAddress
    password = req.body.password
    result = await checkUser(emailAddress, password)
    if (result === 1) { // username & password match
        console.log('login successfully')
        res.send('login')
    } else if (result === -1) { // username & password not match
        console.log('wrong password')
        res.send('wrong password')
    } else if (result === 0) { // user not found
        console.log('user not found')
        res.send('user not found')
    }
}

module.exports = { login, renderPage}