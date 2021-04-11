const fs = require('')
const HandleRequest = (req, res) => {
    let url = req.url
    if (url == '/registration') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.sendFile(path.join(__dirname + '../views/registration.html'))
        if (error) {
            res.writeHead(404)
            res.write('File not found')
        }
    }
}
module.exports = HandleRequest