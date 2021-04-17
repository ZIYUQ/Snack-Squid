const express = require('express')
const path = require('path')
const db = require('./db')
const exphbs = require('express-handlebars')

const customerRouter = require('./routes/customerRouter')
const menuRouter = require('./routes/menuRouter')

const app = express()
app.use(express.urlencoded({ extended: true })) // replaces body-parser
app.use(express.static('public'))

app.engine('hbs', exphbs({
    defaultlayout: 'main',
 	extname: 'hbs'
}))

app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/homepage.html'))
})

// app.get('/menu/:van_id', (req, res) => {
//     res.sendFile(path.join(__dirname + '/views/menu.html'))
// })

app.use('/menu', menuRouter)

app.use('/customer', customerRouter)

app.all('*', (req, res) => { // 'default' route to catch user errors
    res.status(404).send('<p>invalid request</p>')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})