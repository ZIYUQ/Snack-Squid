const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000


app.use(express.json())
app.use('/', express.static('html'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



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

// get registration html page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/registration.html'))
})

// routers in register
app.use('/register', vanRouter)

app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})