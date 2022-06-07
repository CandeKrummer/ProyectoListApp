const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { ShoppingList, Product, ProductCategory, ListedProduct, ProductMeassure } = require('./src/db/models')


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
        where: q,
        include: //[
        // {
        //     model: ProductMeassure,
        //     attributes: ["meassure"],
        // },
        {
            model: ProductCategory,
            attributes: ["category"],
        }
        //]
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
    console.log(req.body.name)
    console.log(req.body.price)
    let count = await Product.count({

        where: {
            name: req.body.name,
            brand: req.body.brand,
            price: req.body.price,
            content: req.body.content,
            productCategoryId: req.body.productCategoryId,
        }
    })

    console.log('cantidad: ' + count)
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
        res.status(201).json({})
    }).catch(err => {
        console.log(err)
        res.status(422).json(err)
    })
    console.log(res)
})

app.put('/listed-products', async function (req, res) {
    console.log(req.body.ShoppingListId)
    console.log(req.body.ProductId)

    let count = await ListedProduct.count({
        where: {
            ShoppingListId: req.body.ShoppingListId,
            ProductId: req.body.ProductId,
        }
    })
    console.log('cantidad: ' + count)

    if (count >= 1) {
        let lp = await ListedProduct.findOne({
            where: {
                ShoppingListId: req.body.ShoppingListId,
                ProductId: req.body.ProductId
            }
        })
        lp.cantidad = lp.cantidad + req.body.cantidad;
        await lp.save().then(data => {
            res.status(204).json({ message: 'LISTED_PRODUCT_UPDATED' })
        }).catch(err => {
            res.status(422).json(err)
        })
    } else {
        ListedProduct.create({
            ShoppingListId: req.body.ShoppingListId,
            ProductId: req.body.ProductId,
            cantidad: req.body.cantidad,
        }).then(data => {
            res.status(201).json({ message: 'LISTED_PRODUCT_CREATED' })
        }).catch(err => {
            res.status(422).json(err)
        })
    }



})
app.post('/shopping-lists', async function (req, res) {
    console.log(req.body.name)
    console.log(req.body.listCategoryId)
    let count = await ShoppingList.count({
        where: {
            name: req.body.name,
            listCategoryId: req.body.listCategoryId,
            //  familyId: req.body.familyId
        }
    })
    console.log('cantidad: ' + count)
    if (count >= 1) {
        return res.status(422).json({ message: 'LIST_EXISTS' })
    }
    ShoppingList.create({
        name: req.body.name,
        listCategoryId: req.body.listCategoryId,
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

