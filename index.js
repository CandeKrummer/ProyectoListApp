const express = require('express')
const app = express()
const { Product, ProductCategory } = require('./src/db/models')

app.get('/', function (req, res) {
    res.send('hello')
})

app.get('/products', function (req, res) {
    let data = await Product.findAll()
    res.send(data)
})

app.get('/productCategory/:id', function (req, res) {
    let data = await ProductCategory.findByPk(req.params.id)
    res.send(data)
})

app.get('/productCategories', function (req, res) {
    let data = await ProductCategory.findAll()

    res.send(data)
})

app.listen(3000)

