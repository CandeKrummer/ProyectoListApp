const express = require('express')
const app = express()
const { Op } = require("sequelize");
const { ShoppingList, Product, ProductCategory, ListedProduct } = require('./src/db/models')
const listedproduct = require('./src/db/models/listedproduct')


app.get('/', function (req, res) {
    res.send('hello')
})

///products?productCategoryId=1

/*app.get('/products', async function (req, res) {
    let q = {};

    if (req.query.productCategoryId) {
        q.productCategoryId = req.query.productCategoryId
    }

    let data = await Product.findAll({
        where: q
    })
    res.send(data)
})*/
app.get('/products', async function (req, res) {
    let q = {};
    let data;
    if (req.query.name) {
        q.name = { [Op.substring] : req.query.name};
    }
    if (req.query.brand) {
        q.brand = { [Op.substring] : req.query.brand};
    }
    if (req.query.price) {
        if(req.query.price < 0)
        {
            req.query.price = req.query.price * -1; 
        }
        q.price = req.query.price
    }
    if(req.query.precioMin && req.query.precioMax) {
        if(req.query.precioMin >= req.query.precioMax) {
            q.price = { [Op.between] : [req.query.precioMax , req.query.precioMin ]}
        }
      q.price = { [Op.between] : [req.query.precioMin , req.query.precioMax ]}
    } else if (req.query.precioMax && !req.query.precioMin) {
         req.query.precioMin = 0; 
         q.price = { [Op.between] : [req.query.precioMin , req.query.precioMax ]}
     } else if ((req.query.precioMin && !req.query.precioMax)) {
        q.price = { [Op.gte] : req.query.precioMin}
     }
    data = await Product.findAll({
        where: q
      });
    res.send(data)
})

//   /shopping-list/1/products

app.get('/shopping-list/:id/products', async function (req, res) {
    let data = {
        shoppingListName: "",
        products: [],
    }

    data.productos = ShoppingList.findByPk(req.params.id, {
        include: [{
            model: Product,
            /*             through: { attributes: ['name'] } */
        }],
    })

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

