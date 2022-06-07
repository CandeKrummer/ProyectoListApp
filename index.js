const express = require('express')
const app = express()

const { ShoppingList, Product, ProductCategory, ListedProduct, ContentMeassure } = require('./src/db/models')


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
        attributes: ['id', 'name', 'brand', 'price', 'content'],
        where: q,
        include: [{
            model: ContentMeassure,
            attributes: ["meassure"],
        },
        {
            model: ProductCategory,
            attributes: ["category"],

        }]
    })
    res.send(data)
})

//   /shopping-list/1/products

app.get('/shopping-lists/:id/products', async function (req, res) {

    let data = await ShoppingList.findByPk(req.params.id, {
        include: {
            model: ListedProduct,
            attributes: ["cantidad"],
            include: {
                model: Product,
                attributes: ["name", "brand", "price", "content", "name"],
                include: [
                    // {
                    //     model: ProductMeassure,
                    //     attributes: ["meassure"],
                    // },
                    {
                        model: ProductCategory,
                        attributes: ["category"],
                    }

                ]
            }

        }
    });
    console.log(data.productos)
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

app.get('/product-categories/:id', async function (req, res) {
    let data = await ProductCategory.findByPk(req.params.id, {
        attributes: ["category"],
    })
    res.send(data)
})

app.get('/product-categories', async function (req, res,) {
    let data = await ProductCategory.findAll({
        attributes: ["category"],
    })

    res.send(data)
})

app.get('/shopping-lists', async function (req, res) {
    let data = await ShoppingList.findAll()

    res.send(data)
})

app.get('/shopping-lists/:id', async function (req, res) {
    let data = await ShoppingList.findByPk(req.params.id)
    console.log(data.listedproducts)
    res.send(data)
})

app.listen(3000)

