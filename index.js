const express = require('express')
const app = express()
const { ShoppingList } = require('./src/db/models')

app.get('/', function (req, res) {
    res.send('hello')
})

app.get('/shopping-lists', async function (req, res) {
    let data = await ShoppingList.findAll()
    res.send(data)
})

app.get('/shopping-lists/:id', async function (req, res) {
    let data = await ShoppingList.findByPk(req.params.id)
    res.send(data)
})

app.listen(3000)