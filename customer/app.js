const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/', express.static('html'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

const menuRouter = require('./routes/menuRoutes')
const customerRouter = require('./routes/customerRoutes')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/homepage.html'))
})

app.use('/cus', customerRouter)

app.use('/menu', menuRouter)

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'))
})

app.all('*', (req, res) => {  // 'default' route to catch user errors
    res.status(404).send('<p>invalid request</p>')
})

app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})