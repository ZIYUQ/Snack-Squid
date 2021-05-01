const { Customer } = require('../../model/customer')
const bcrypt = require('bcryptjs');

// express-validator, to validate user data in forms
const expressValidator = require('express-validator')

const renderSignupPage = async(req, res) => {
    res.render('customer/signup')
}

const hashPassword = async(plainPassword) => {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds).then(function(err, hash) {
        if (err) return err
        return hash
    })
    return hashedPassword
}

// Sign up
const signup = async(req, res) => {
    let emailAddress = req.body.emailAddress
    let password = req.body.password
    let givenName = req.body.givenName
    let familyName = req.body.familyName

    // check if user is already exists
    const customer = await Customer.find({ emailAddress: emailAddress }, {})
    if (customer.length != 0){
        console.log("user already exists")
        return res.send("user already exists")
    }
    const hashedPassword = await hashPassword(password)
    const newCustomer = new Customer({
        givenName: givenName,
        familyName: familyName,
        emailAddress: emailAddress,
        password: hashedPassword,
    })
    await newCustomer.save((err, result) => {
        if (err) console.log(err)
        console.log("signup successfully")
        res.send("signup successfully")
    })

}

const renderLoginPage = async(req, res) => {
    res.render('customer/login')
}

// check user and password
async function checkUser(emailAddress, password) {
    let result = await Customer.findOne({ emailAddress: emailAddress }, { password: true } )
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
    let emailAddress = req.body.emailAddress
    let password = req.body.password
    let result = await checkUser(emailAddress, password)
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

module.exports = { login, signup, renderLoginPage, renderSignupPage }