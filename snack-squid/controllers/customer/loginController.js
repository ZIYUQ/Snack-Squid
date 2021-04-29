const { Customer } = require('../../model/customer')

// express-validator, to validate user data in forms
const expressValidator = require('express-validator')

async function checkUser(emailAddress, password) {
    result = await Customer.findOne({
        emailAddress: emailAddress
    }, { password: true })
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

// Check vanName and password when login
// If van is valid, allow the van to set up location and open
const login = async(req, res) => {
    emailAddress = req.body.emailAddress
    password = req.body.password
    result = await checkUser(emailAddress, password)
    if (result === 1) {
        res.send('login')
    } else if (result === -1) {
        res.send('wrong password')
    } else if (result === 0) {
        res.send('no such van')
    }
}


module.exports = { login }