const mongoose = require("mongoose")

const customer = mongoose.model("customer")

// const db = require('../model/index')

// get all user
const getAllCustomer = async (req, res) => {
    try {
      const allcustomer = await customer.find()
      return res.send(allcustomer)
    } catch (err) {
      res.status(400)
      return res.send("Database query failed")
  } 
}


// get user info
const getCustomerByName = async (req,res)=>{
    try{
        const user = await customer.findOne({givenName: req.params.givenName}, 
            {givenName: true, email_address: true, _id: false})
        if (user === null){
            res.status(404)
            return res.send("New user? Sign up now!")
        }
        return res.send(user)
    } catch(err){
        res.status(400)
        res.send("error")
    }
}

// add new customer
const addNewCustomer = async (req, res) => {
    try{
        const newUser = new customer({
            givenName: req.body.givenName,
            familyName: req.body.familyName,
            email_address: req.body.email_address,
            password: req.body.password
        })

        await newUser.save(function (err){
            if (err) console.log(err)
        })
        return res.send(newUser)

    }catch(err){
        res.status(400)
        res.send("insert data fail")
    }
}

module.exports = {getAllCustomer, getCustomerByName, addNewCustomer}
