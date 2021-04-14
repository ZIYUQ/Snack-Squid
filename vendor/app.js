const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/', express.static('html'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const { Van } = require('./models/van')
const db = require('./db')


//set up vanRouter
const vanRouter = require('./routes/vanRoutes')
    //Use directory public to serve images, css files, javascript
const openRouter = require('./routes/openRoutes')
app.use(express.static('public'))

// get index html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))
})

// log in page, enter Peter for van name, enter 8888 for password
app.post('/', async(req, res) => {
    result = await Van.findOne({
        name: req.body.name,
        password: req.body.password
    }, { name: true })
    if (result) {
        res.redirect('/open-for-business/name=' + result['name'])
    } else {
        res.send('<h1>no such van</h1>')
    }
})

// get registration html page
app.use('/van-management', vanRouter)

app.use('/open-for-business', openRouter)
    // routers in register

app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})