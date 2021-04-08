const express = require('express')
const app = express()
const path = require('path')

//set up vanRouter
const vanRouter = require('./routes')
    //Use directory public to serve images, css files, javascript

app.use(express.static('public'))

// get index html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))
})

app.get('/vendor/:van_name', (req, res) => {
    res.send(req.params.van_name)
})

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/registration.html'))
})

// use vanRouter
app.use('/van-management', vanRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})