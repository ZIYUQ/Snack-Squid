const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080
const cookie = require('cookie-parser')
const session = require('express-session')

app.use(express.json())
app.use('/', express.static('html'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//set up vanRouter
const vanRouter = require('./routes/vanRoutes')
    //Use directory public to serve images, css files, javascript
const openRouter = require('./routes/openRoutes')

const orderRouter = require('./routes/orderRoutes')

const registerRouter = require('./routes/registerRoutes')

const loginRouter = require('./routes/loginRoutes')

app.use(express.static('public'))

app.use(cookie('express_cookie'))
app.use(session({
    secret: 'express_cookie',
    resave: false,
    saveUnitialized: true,
    cookie: { maxAge: 60 * 1000 * 30 },
    rolling: true
}))


// get index html page log in page, enter Peter for van name, enter 8888 for password
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/registration.html'))
})

app.get('/open-for-business/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/open.html'))
})

app.use('/van-management', vanRouter)

app.use('/open-for-business', openRouter)

app.use('/', loginRouter)

app.use('/order', orderRouter)
    // routers in register
app.use('/register', registerRouter)

app.all('*', (req, res) => { // 'default' route to catch user errors
    res.status(404).send('<p>invalid request</p>')
})

app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})