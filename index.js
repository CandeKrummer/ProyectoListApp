const express = require('express')
const app = express()

const { ShoppingList, Product, ProductCategory, ListedProduct } = require('./src/db/models')
const listedproduct = require('./src/db/models/listedproduct')


app.get('/', function (req, res) {
    res.send('hello')
})

///products?productCategoryId=1

app.get('/products', async function (req, res) {
    let q = {};

    if (req.query.productCategoryId) {
        q.productCategoryId = req.query.productCategoryId
    }

    let data = await Product.findAll({
        where: q
    })
    res.send(data)
})


app.get('/shopping-list/:id/products', async function (req, res) {
    let data = {
        shoppingListName: {},
        products: [],
    }

    data.shoppingListName = await ListedProduct.findAll({
        where: {
            ShoppingListId: req.params.id
        },
        inlcude: ['ShoppingList'],
    });

    data.shoppingListName.forEach(lp => data.products.push(await Product.findByPk(lp.ProductId)));

    res.send(data)
})

app.post('/products', async function (req, res) {
    Product.create({

    }).then(data => {
        res.status(201).json({})
    }).catch(err => {
        res.status(422).json(err)
    })
})

app.get('/product-category/:id', async function (req, res) {
    let data = await ProductCategory.findByPk(req.params.id)
    res.send(data)
})

app.get('/product-categories', async function (req, res) {
    let data = await ProductCategory.findAll()

    res.send(data)
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

