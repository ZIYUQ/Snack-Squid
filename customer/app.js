const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('views/homepage'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/homepage/homepage.html'))
})

app.get('/menu/:van_id', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/menu/menu.html'))
})

app.all('*', (req, res) => {  // 'default' route to catch user errors
    res.status(404).send('<p>invalid request</p>')
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})