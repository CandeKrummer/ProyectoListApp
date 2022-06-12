const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const req = require('express/lib/request');
const { ShoppingList, Product, ProductCategory, ListedProduct, ContentMeassure, ShoppingListCategory, Family } = require('./src/db/models')


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

app.get('/products-in-stock', async function (req, res) {
    let stock = await ShoppingList.findByPk(5, {
        include: [{
            model: ShoppingListCategory,
            attributes: ["category"]
        },
        {
            model: ListedProduct,
            attributes: ["cantidad"],
            include: {
                model: Product,
                attributes: ["id", "name", "brand", "price", "content"],
                include: [
                    {
                        model: ContentMeassure,
                        attributes: ["meassure"],
                    },
                    {
                        model: ProductCategory,
                        attributes: ["category"],
                    }

                ]
            }

        }]
    })
    res.send(stock.ListedProducts)
})

//   /shopping-lists/1/products

app.get('/shopping-lists/:id/products', async function (req, res) {

    let data = await ShoppingList.findByPk(req.params.id, {
        include: [
            {
                model: ShoppingListCategory,
                attributes: ["category"]
            },
            {
                model: ListedProduct,
                attributes: ["cantidad"],
                include: {
                    model: Product,
                    attributes: ["name", "brand", "price", "content"],
                    include: [
                        {
                            model: ContentMeassure,
                            attributes: ["meassure"],
                        },
                        {
                            model: ProductCategory,
                            attributes: ["category"],
                        }

                    ]
                }

            }]
    });
    res.send(data)
})

app.post('/products', async function (req, res) {
    let count = await Product.count({

        where: {
            name: req.body.name,
            brand: req.body.brand,
            price: req.body.price,
            content: req.body.content,
            productCategoryId: req.body.productCategoryId,
        }
    })
    if (count >= 1) {
        return res.status(422).json({ message: 'PRODUCT_EXISTS' })
    }


    Product.create({
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        content: req.body.content,
        productCategoryId: req.body.productCategoryId,
        contentMeassureId: req.body.contentMeassureId,
    }).then(data => {
        res.status(201).json({ ProductId: data.id })
    }).catch(err => {
        res.status(422).json(err)
    })
})


app.patch('/listed-products/:id', async function (req, res) {
    let cantidad = req.body.cantidad
    let lp;

    if (cantidad < 0) {
        cantidad = cantidad * (-1)
    }

    if (cantidad == 0) {
        return res.status(422).json({ message: 'INVALID_QUANTITY' })
    }

    lp = await ListedProduct.findByPk(req.params.id)

    if (lp != undefined) {

        lp.cantidad += cantidad;
        lp.save().
            then(data => {
                res.status(204).json({ message: 'LISTED_PRODUCT_UPDATED' })
            }).catch(err => {
                res.status(422).json(err)
            })
    } else {
        return res.status(422).json(err);
    }
})

app.post('/listed-products', async function (req, res) {
    let listId = req.body.ShoppingListId
    let prodId = req.body.ProductId
    let cantidad = req.body.cantidad

    if (cantidad < 0) {
        cantidad = cantidad * (-1)
    }

    if (cantidad == 0) {
        return res.status(422).json({ message: 'INVALID_QUANTITY' })
    }

    let count = await ShoppingList.count({
        where: {
            id: listId,
        }
    })
    if (count == 0) {
        return res.status(422).json({ message: 'UNDEFINED_LIST' })
    }

    count = await Product.count({
        where: {
            id: prodId,
        }
    })
    if (count == 0) {
        return res.status(422).json({ message: 'UNDEFINED_PRODUCT' })
    }

    ListedProduct.create({
        ShoppingListId: listId,
        ProductId: prodId,
        cantidad: cantidad,
    }).then(data => {
        res.status(201).json({ listedProductId: data.id, message: 'LISTED_PRODUCT_CREATED' })

    }).catch(err => {
        res.status(422).json(err)
    })
})

/*
app.post('/families', async function (req, res) {
    Family.create({
        name: req.body.name,
        address: req.body.address,
        number: req.body.number,
        password: req.body.password
    }).then(data => {
        res.status(201).json({})
    }).catch(err => {
        res.status(422).json(err)
    })

})*/

app.post('/shopping-lists', async function (req, res) {
    let count = await ShoppingList.count({
        where: {
            name: req.body.name,
            familyId: req.body.familyId
        }
    })
    if (count >= 1) {
        return res.status(422).json({ message: 'LIST_EXISTS' })
    }
    ShoppingList.create({
        name: req.body.name,
        listCategoryId: req.body.listCategoryId,
        familyId: req.body.familyId,
    }).then(data => {
        res.status(201).json({ shoppingListId: data.id })
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
    res.send(data)
})

app.post('/family', async function (req, res) {

    let count = await Family.count({
        where: {
            name: req.body.name
        }
    })

    if (count >= 1) {
        return res.status(422).json({ message: 'FAMILY_EXISTS' })
    }

    Family.create({
        name: req.body.name,
        address: req.body.address,
        number: req.body.number,
        password: req.body.password
    }).then(data => {
        res.status(201).json({})
    }).catch(err => {
        res.status(422).json(err)
    })
})

app.listen(3000)

