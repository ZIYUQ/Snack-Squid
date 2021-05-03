const { Customer } = require('../../model/customer')
const ObjectId = require('mongoose').Types.ObjectId
const bcrypt = require('bcryptjs');
const SALTROUNDS = 10

const OPTIONS = {
    maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
    httpOnly: true, // The cookie only accessible by the web server
    signed: false // Indicates if the cookie should be signed
}

// express-validator, to validate user data in forms
const expressValidator = require('express-validator')

const renderSignupPage = async(req, res) => {
    // if (req.cookies['userId'] != undefined){
    //     console.log('customer already logged in')
    //     return res.redirect('/customer/menu/van=SnackSquid')
    // }
    res.render('customer/signup')
}

const hashPassword = async(plainPassword) => {
    const hashedPassword = await bcrypt.hash(plainPassword, SALTROUNDS).then(function(err, hash) {
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
    if (customer.length != 0) {
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
        res.cookie('userId', newCustomer._id.toHexString(), OPTIONS)
        res.cookie('givenName', newCustomer.givenName, OPTIONS)
        res.cookie('familyName', newCustomer.familyName, OPTIONS)
        res.redirect("/customer/")
    })

}

const renderLoginPage = async(req, res) => {
    if (req.cookies['userId'] != undefined) {
        console.log('customer already logged in')
        return res.redirect('/customer/menu/van=SnackSquid')
    }
    res.render('customer/login')
}

// check user and password
async function checkUser(emailAddress, password, res) {
    try {
        let result = await Customer.findOne({ emailAddress: emailAddress }, { password: true, givenName: true, familyName: true })
        if (result) {
            const match = await bcrypt.compare(password, result.password);
            if (match) {
                return result
            } else {
                return -1
            }
        } else {
            return 0
        }
    } catch (err){
        console.log("Database query collection 'customers' failed")
        return res.redirect('/404-NOT-FOUND')
    }
}

// Login
const login = async(req, res) => {
    let emailAddress = req.body.emailAddress
    let password = req.body.password
    let result = await checkUser(emailAddress, password, res)
    if (result === 0) { // user not found
        console.log('customer user not found')
        res.send('customer user not found')
    } else if (result === -1) { // username & password not match
        console.log('customer user wrong password')
        res.send('customer user wrong password')
    } else { // user found
        res.cookie('userId', result._id.toHexString(), OPTIONS)
        res.cookie('givenName', result.givenName, OPTIONS)
        res.cookie('familyName', result.familyName, OPTIONS)
        console.log('customer login successfully')
        res.redirect('/customer/menu/van=SnackSquid')
    }
}

// Render profile page
const renderProfilePage = async(req, res) => {
    if (req.cookies['userId'] == undefined){
        console.log('customer has not logged in')
        return res.redirect('/customer/login')
    }
    let userId = new ObjectId(req.cookies['userId'])
    try {
        let result = await Customer.findOne({_id: userId}, {givenName: true, familyName: true, emailAddress: true})
        if (result){
            res.render('customer/profile', {"customer": result})
        } else{
            console.log('customer not found')
            res.clearCookie('userId')
            return res.redirect('/customer/login')

        }
    } catch (err){
        console.log("Database query collection 'customers' failed!")
        return req.redirect('/404-NOT-FOUND')
    }
}

const logout = async(req, res) => {
    res.clearCookie('userId')
    console.log('logout successfully')
    return res.redirect('/customer/login')
}


module.exports = { login, signup, logout, renderLoginPage, renderSignupPage, renderProfilePage }