const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000


app.use(express.json())
app.use('/', express.static('html'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('dotenv').config()


//set up vanRouter
const vanRouter = require('./routes/vanRoutes')
    //Use directory public to serve images, css files, javascript

const useRouter = require('./routes/users')
const userRouter = require('./routes/users')
app.use(express.static('public'))

// get index html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/registration.html'))
})
const db = require('./db')
const { Van } = require('./db')

app.post('/register', (req, res) => {
    const newVan = new Van({
        van_name: req.body.vanName,
        password: req.body.password,
        email_address: req.body.emailAddress,
        mobile_number: req.body.mobileNumber
    })
    db.collection('vans').insertOne(newVan)
    res.send('Data received:\n' + JSON.stringify(newVan))
})

app.get('/allvans', (req, res) => {
    const allvans = db.collection('Vans')
    res.send(allvans)
})

app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})