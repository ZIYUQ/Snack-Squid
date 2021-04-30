const express = require('express')
const path = require('path')
const db = require('./db')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// router for Customer app
const menuRouterCT = require('./routes/customer/menuRouter')
const loginRouterCT = require('./routes/customer/loginRouter')
const signupRouterCT = require('./routes/customer/signupRouter')

// router for Vendor app
const vanRouterVD = require('./routes/vendor/vanRouter')
const openRouterVD = require('./routes/vendor/openRouter')
const orderRouterVD = require('./routes/vendor/orderRouter')
const registerRouterVD = require('./routes/vendor/registerRouter')
const loginRouterVD = require('./routes/vendor/loginRouter')

// express configuration
const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true })) // replaces body-parser
app.use(express.static('public'))

app.engine('hbs', exphbs({
    defaultlayout: 'main',
    extname: 'hbs'
}))

app.set('view engine', 'hbs')


// Customer app
app.get('/customer', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/customer/homepage.html'))
})

app.use('/customer/signup', signupRouterCT)

app.use('/customer/login', loginRouterCT)

app.use('/customer/menu', menuRouterCT)


// Vendor app
app.get('/vendor', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/vendor/index.html'))
})

app.get('/vendor/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/vendor/registration.html'))
})

// app.get('/vendor/open-for-business/:vanName', (req, res) => {
//     res.send('Please post location')
// })

// app.get("/vendor/order/:vanName", (req, res) => {
//     res.send('You can mark an order by its id to be fulfilled')
// })
app.use('/vendor/van-management', vanRouterVD)

app.use('/vendor/open-for-business', openRouterVD)

app.use('/vendor', loginRouterVD)

app.use('/vendor/order', orderRouterVD)
    // routers in register
app.use('/vendor/register', registerRouterVD)

app.all('*', (req, res) => { // 'default' route to catch user errors
    res.status(404).send('<p>invalid request</p>')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})