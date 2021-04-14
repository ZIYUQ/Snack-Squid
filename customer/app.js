const express = require('express')
require("./model")
const app = express()
const path = require('path')  
const bodyParser = require('body-parser')
const customerRouter = require('./routes/customerRouter')
const snackRouter = require('./routes/snackRouter')
const orderRouter = require('./routes/orderRouter')
app.use(bodyParser.json())


app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/homepage.html'))
})

// app.get('/menu/:van_id', (req, res) => {
//     res.sendFile(path.join(__dirname + '/views/menu.html'))
// })

app.use('/menu', snackRouter)

app.use('/customer', customerRouter)

app.use('/cart', orderRouter)

app.all('*', (req, res) => {  // 'default' route to catch user errors
    res.status(404).send('<p>invalid request</p>')
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})