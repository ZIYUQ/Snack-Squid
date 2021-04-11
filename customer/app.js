const express = require('express')
const app = express()
const path = require('path')  
app.use(express.json())


app.use(express.static('views/homepage'))

// 
const {snack} = require("./model/index")

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/homepage.html'))
})

app.get('/menu/:van_id', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/menu.html'))
})

app.all('*', (req, res) => {  // 'default' route to catch user errors
    res.status(404).send('<p>invalid request</p>')
})

//
app.get('/menu',  async (req, res) => {
    try{
        result = await snack.find({}, {name: true, price: true, _id:false})
        res.send(result)
    } catch(err){
        res.status(400)
        res.send("error")
    }
   
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})