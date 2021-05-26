const Customer = require('../../model/customer')
const ObjectId = require('mongoose').Types.ObjectId


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
    if (req.isAuthenticated()) {
        return res.redirect('/customer/choose-van')
    } else {
        return res.render('customer/login')
    }
}

// Render profile page
const renderProfilePage = async(req, res, status) => {
    let userId = req.session.userId
    try {
        let result = await Customer.findOne({ _id: userId }, { givenName: true, familyName: true, emailAddress: true }).lean()
        if (result) {
            if (status === 1) {
                res.render('customer/profile', { "customer": result })
            }
            if (status === 0) {

                res.render('customer/editProfile', { "customer": result })
            }
        } else {
            console.log('customer not found')
            return res.redirect('/customer/login')

        }
    } catch (err) {
        console.log("Database query collection 'customers' failed!")
        return req.redirect('/404-NOT-FOUND')
    }
}

// logout
const logout = (req, res) => {
    req.logout()
    console.log('logout successfully')
    return res.redirect('/customer/')
}

const updateProfile = async(req, res) => {

    const customerid = req.params.customerid;
    try {
        let customer = await Customer.findOne({ _id: customerid })
        let givenname = req.body.givenName;
        let familyname = req.body.familyName;
        let password = req.body.password;

        if (givenname){
            await Customer.updateOne({ _id: customerid }, { $set: { givenName: givenname } })
        }
        if (familyname){
            await Customer.updateOne({ _id: customerid }, { $set: { familyName: familyname } })
        }
        if (password){
            await Customer.updateOne({ _id: customerid }, { $set: { password: customer.generateHash(req.body.password) } })
        }
           
        customer = await Customer.findOne({ _id: customerid }, { givenName: true, familyName: true, emailAddress: true }).lean()

        if (customer) {
            // res.render('customer/profile', { "customer": customer })
            console.log("update profile sucessfully")
            res.render('customer/profile', { "customer": customer })
        } else {
            console.log('customer not found')
            return res.redirect('/customer/login')
        }
    } catch (err) {
        console.log(err)
    }

}

// const changePassword = async(req, res) => {
//     const customerid = req.params.customerid;
//     try {
//         let customer = await Customer.findOne({ _id: customerid })
//         await Customer.updateOne({ _id: customerid }, { $set: { password: customer.generateHash(req.body.password) } })

//         customer = await Customer.findOne({ _id: customerid }, { givenName: true, familyName: true, emailAddress: true }).lean()

//         if (customer) {
//             // res.render('customer/profile', { "customer": customer })
//             console.log("update password sucessfully")
//             res.render('customer/editprofile', { "customer": customer })
//         } else {
//             console.log('customer not found')
//             return res.redirect('/customer/login')
//         }
//     } catch (err) {
//         console.log(err)
//     }

// }



module.exports = { logout, renderLoginPage, renderProfilePage, renderSignupPage, updateProfile }