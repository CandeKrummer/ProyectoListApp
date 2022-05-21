const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('hello')
})

app.get('/products', function (req, res) {
    res.send([])
})

app.listen(3000)

