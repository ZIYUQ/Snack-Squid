const { Customer } = require('../../model/customer')
const ObjectId = require('mongoose').Types.ObjectId
const bcrypt = require('bcryptjs');
const SALTROUNDS = 10

const OPTIONS_SERVER = {
    maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
    httpOnly: true, // The cookie only accessible by the web server
    signed: false // Indicates if the cookie should be signed
}

const OPTIONS_LOCAL = {
    maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
    httpOnly: false, // The cookie only accessible by the web server
    signed: false // Indicates if the cookie should be signed
}

// express-validator, to validate user data in forms
const expressValidator = require('express-validator')

const renderSignupPage = async(req, res) => {
    res.render('customer/signup')
}



const renderLoginPage = async(req, res) => {
    if (req.isAuthenticated())
        return res.redirect('/customer/menu/van=SnackSquid')
    else return res.render('customer/login')
}

// Render profile page
const renderProfilePage = async(req, res) => {
    let userId = req.session.userId
    try {
        let result = await Customer.findOne({ _id: userId }, { givenName: true, familyName: true, emailAddress: true })
        if (result) {
            res.render('customer/profile', { "customer": result })
        } else {
            console.log('customer not found')
            return res.redirect('/customer/login')

        }
    } catch (err) {
        console.log("Database query collection 'customers' failed!")
        return req.redirect('/404-NOT-FOUND')
    }
}

const logout = async(req, res) => {
    req.logout()
    console.log('logout successfully')
    return res.redirect('/customer/')
}


module.exports = { logout, renderLoginPage, renderProfilePage, renderSignupPage }