const express = require('express')
const path = require('path')
const db = require('./db')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cookie = require('cookie-parser')
const session = require('express-session')

// express configuration
const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })) // replaces body-parser
app.use(express.static('public'))

app.engine('hbs', exphbs({
    defaultlayout: 'main',
    extname: 'hbs'
}))

app.set('view engine', 'hbs')

// passport session
const cors = require('cors')
const passport = require('passport')
const flash = require('connect-flash-plus')

// const jwt = require('jsonwebtoken')
// const dotenv = require('dotenv').config()


app.use(cors({
    credentals: true,
    origin: "http://localhost:3000"
}))

app.use(session({
    secret: "a secret",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())

app.use(passport.session())

app.use(flash())

//google map API


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

app.get('/open-for-business', (req, res) => {
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

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})