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

app.use(express.static('public'))

// get index html page
app.get('/', (req, res) => {
    res.send('<h1>mark as openForBusiness</h1>')
})

// get registration html page
app.use('/van-management', vanRouter)


// routers in register


app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})