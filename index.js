const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const { Op } = require("sequelize");
const { ShoppingList, Product, ProductCategory, ListedProduct, ShoppingListCategory, Family, User, FamilyUser } = require('./src/db/models')


app.get('/', function (req, res) {
    res.send('Welcome to the ListApp API')
})

app.get('/products', async function (req, res) {
    let q = {};
    let data;
    if (req.query.name) {
        q.name = { [Op.substring]: req.query.name };
    }
    if (req.query.brand) {
        q.brand = { [Op.substring]: req.query.brand };
    }
    if (req.query.price) {
        if (req.query.price < 0) {
            req.query.price = req.query.price * -1;
        }
        q.price = req.query.price
    }
    if (req.query.precioMin && req.query.precioMax) {
        if (req.query.precioMin >= req.query.precioMax) {
            q.price = { [Op.between]: [req.query.precioMax, req.query.precioMin] }
        }
        q.price = { [Op.between]: [req.query.precioMin, req.query.precioMax] }
    } else if (req.query.precioMax && !req.query.precioMin) {
        req.query.precioMin = 0;
        q.price = { [Op.between]: [req.query.precioMin, req.query.precioMax] }
    } else if ((req.query.precioMin && !req.query.precioMax)) {
        q.price = { [Op.gte]: req.query.precioMin }
    }
    data = await Product.findAll({
        where: q
    });
    res.send(data)
})

app.get('/products-in-stock', async function (req, res) {
    let stock = await ShoppingList.findByPk(1, {
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
    }).then(data => {
        res.status(201).json({ ProductId: data.id })
    }).catch(err => {
        res.status(422).json(err)
    })
})

app.patch('/listed-products/:id', async function (req, res) {
    let cantidad = req.body.cantidad
    let actualQuantity;
    let lp;

    lp = await ListedProduct.findByPk(req.params.id)

    if (lp != undefined) {
        actualQuantity = lp.cantidad
        if (cantidad < 0) {
            if ((cantidad * (-1)) >= actualQuantity) {
                return res.status(422).json({ message: 'INVALID_QUANTITY' })
            }
        }

        if (cantidad == 0) {
            return res.status(422).json({ message: 'INVALID_QUANTITY_0_IS_NOT_VALID' })
        }
        lp.cantidad += cantidad;
        lp.save().
            then(data => {
                res.status(204).json({})
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

    console.log("ID DE LISTA" + listId);
    let count = await ShoppingList.count({
        where: {
            id: listId,
        }
    })
    if (count == 0) {
        return res.status(422).json({ message: 'UNDEFINED_LIST' })
    }

    console.log("ID DEL PRODUCTO" + prodId);
    let cant = await Product.count({
        where: {
            id: prodId,
        }
    })
    if (cant == 0) {
        return res.status(422).json({ message: 'UNDEFINED_PRODUCT' })
    }

    count = await ListedProduct.count({
        where: {
            ProductId: prodId,
            ShoppingListId: listId,
        }
    })
    if (count > 0) {
        return res.status(422).json({ message: 'LISTED_PRODUCT_ALREADY_EXISTS' })
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

app.post('/families', async function (req, res) {

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
        password: req.body.password,
        createdAt: new Date,
        updatedAt: new Date,
    }).then(data => {
        let famId = data.id
        //Creo la lista de compras de la familia
        ShoppingList.create({
            name: 'Lista de Compras',
            listCategoryId: 1,
            familyId: famId,
            createdAt: new Date,
            updatedAt: new Date,
        }).then(data => {
            let listaDeComprasId = data.id
            ShoppingList.create({
                name: 'Alacena Virtual',
                listCategoryId: 2,
                familyId: famId,
                createdAt: new Date,
                updatedAt: new Date,
            }).then(data => {
                let alacenaVirtualId = data.id
                res.status(201).json({ familyId: famId, listaDeComprasId: listaDeComprasId, alacenaVirtualId: alacenaVirtualId })
            }).catch(err => {
                res.status(422).json(err)
            })
        }).catch(err => {
            res.status(422).json(err)
        })
    })
})

app.post('/familyUsers', async function (req, res) {
    let famId = req.body.familyId
    let userId = req.body.userId
    console.log(userId)
    console.log(famId)

    let count = await Family.count({
        where: {
            id: famId,
        }
    })
    if (count == 0) {
        return res.status(422).json({ message: 'FAMILY_DOESNT_EXIST' })
    }

    count = await User.count({
        where: {
            id: userId,
        }
    })
    if (count == 0) {
        return res.status(422).json({ message: 'USER_DOESNT_EXIST' })
    }

    count = await FamilyUser.count({
        where: {
            familyId: famId,
            userId: userId,
        }
    })
    console.log(count)
    if (count > 0) {
        return res.status(422).json({ message: 'ALREADY_JOINED_FAMILY' })
    }


    FamilyUser.create({
        FamilyId: famId,
        UserId: userId,
    }).then(data => {
        res.status(201).json({ familyUser: data.id })
    }).catch(err => {
        res.status(422).json(err)
        console.log(err)
    })
})

app.post('/users', async function (req, res) {
    let userName = req.body.name
    let userEmail = req.body.email
    let userPassword = req.body.password

    let count = await User.count({
        where: {
            email: userEmail,
        }
    })
    if (count > 0) {
        return res.status(422).json({ message: 'EMAIL_ALREADY_USED' })
    }

    User.create({
        name: userName,
        email: userEmail,
        password: userPassword
    }).then(data => {
        res.status(201).json({ userId: data.id })
    }).catch(err => {
        res.status(422).json(err)
    })



})

app.get('/family', async function (req, res) {
    let q = {};
    let data;
    let trajoNombre = false;
    if (req.query.name) {
        q.name = { [Op.substring]: req.query.name };
        trajoNombre = true;
    }
    data = await Family.findAll({
        where: q
    });
    if (trajoNombre && data == 0) {
        return res.status(422).json({ message: 'FAMILY_DOESNT_EXIST' })
    }
    res.send(data)
})

app.delete('/shopping-lists/:id', async function (req, res) {
    ShoppingList.destroy({
        where: {
            id: req.params.id,
        }
    }).then(data => {
        ListedProduct.destroy({
            where: {
                ShoppingListId: req.params.id,
            }
        }).then(data => {
            res.status(201).json({})
        }).catch(err => {
            res.status(422).json(err)
        })
    }).catch(err => {
        res.status(422).json({ message: 'LIST_DOESNT_EXIST' })
    })
})

app.delete('/listed-products/:id', async function (req, res) {

    let listedProd = await ListedProduct.findByPk(req.params.id)
    if (listedProd == undefined) {
        res.status(422).json({ message: 'LISTED_PRODUCT_NOT_FOUND' })
    } else {
        await listedProd.destroy()
            .then(data => {
                res.status(200).json({})
            }).catch(err => {
                res.status(422).json({})
            })
    }
})

app.delete('/products/:id', async function (req, res) {
    let prodId = req.params.id

    let product = await Product.findByPk(prodId)
    if (product == undefined) {
        res.status(422).json({ message: 'PRODUCT_DOES_NOT_EXIST' })
    } else {
        product.destroy({
            where: {
                id: prodId,
            }
        }).then(data => {
            ListedProduct.destroy({
                where: {
                    ProductId: prodId,
                }
            }).then(data => {
                res.status(200).json({})
            }).catch(err => {
                res.status(422).json(err)
                console.log(err)
            })
        }).catch(err => {
            res.status(422).json()
        })
    }

})

app.get('/virtual-cupboard/:familyId', async function (req, res) {
    let count = await Family.count({
        where: {
            id: req.params.familyId
        }
    })

    if (count == 0) {
        return res.status(422).json({ message: 'FAMILY_DOESNT_EXIST' })
    }

    let q = {};
    q.familyId = req.params.familyId;
    q.name = 'Alacena Virtual';
    let data = await ShoppingList.findAll({
        where: q
    });
    res.send(data)
})

app.delete('/families/:id', async function (req, res) {
    Family.destroy({
        where: {
            id: req.params.id,
        }
    }).then(data => {
        ShoppingList.destroy({
            where: {
                familyId: req.params.id,
            }
        }).then(data => {
            FamilyUser.destroy({
                where: {
                    familyId: req.params.id,
                }
            }).then(data => {
                res.status(201).json({ message: 'FAMILY_FOUND' })
            }).catch(err => {
                res.status(422).json(err)
            })
        }).catch(err => {
            res.status(422).json(err)
        })
    }).catch(err => {
        res.status(422).json({ message: 'FAMILY_DOESNT_EXIST' })
    })
})

app.delete('/users/:id', async function (req, res) {
    User.destroy({
        where: {
            id: req.params.id,
        }
    }).then(data => {
        FamilyUser.destroy({
            where: {
                userId: req.params.id,
            }
        }).then(data => {
            res.status(201).json({ message: 'USER_FOUND' })
        }).catch(err => {
            res.status(422).json(err)
        })
    }).catch(err => {
        res.status(422).json({ message: 'USER_DOESNT_EXIST' })
    })
})

//Saca los productos de la lista de compras y los pone en la alacena virtual
app.patch('/realizar-compra/:familyId', async function (req, res) {
    let countFamilia = await Family.count({
        where: {
            id: req.params.familyId
        }
    })

    if (countFamilia == 0) {
        return res.status(422).json({ message: 'FAMILY_DOESNT_EXIST' })
    }

    let listaDeComprasId;
    let alacenaVirtualId;

    let listaDeCompras = await ShoppingList.findOne({
        where: {
            familyId: req.params.familyId,
            name: 'Lista de Compras'
        }
    });
    listaDeComprasId = listaDeCompras.id;

    //busco la alacena virtual de la familia
    let alacenaVirtual = await ShoppingList.findOne({
        where: {
            familyId: req.params.familyId,
            name: 'Alacena Virtual'
        }
    })
    alacenaVirtualId = alacenaVirtual.id;

    //me fijo cuántos productos tiene la lista de compras
    cantProdLdc = await ListedProduct.count({
        where: {
            ShoppingListId: listaDeCompras.id,
        }
    })

    if (cantProdLdc == 0) {
        return res.status(422).json({ message: 'EMPTY_SHOPPING_LIST' })
    }

    //traigo los productos de la lista
    let productosEnLista = await ListedProduct.findAll({
        where: {
            ShoppingListId: listaDeCompras.id,
        }
    })

    let cantProductos = 0;
    for (let i = 0; i < productosEnLista.length; i++) {
        cantProductos = await ListedProduct.count({
            where: {
                ShoppingListId: alacenaVirtualId,
                ProductId: productosEnLista[i].ProductId
            }
        })

        if (cantProductos == 0) {
            await ListedProduct.create({
                ShoppingListId: alacenaVirtualId,
                ProductId: productosEnLista[i].ProductId,
                cantidad: productosEnLista[i].cantidad,
            })
        } else {
            let lp;
            lp = await ListedProduct.findOne({
                where: {
                    ShoppingListId: alacenaVirtualId,
                    ProductId: productosEnLista[i].ProductId
                }
            })
            lp.cantidad += productosEnLista[i].cantidad;
            lp.save()
        }

        let lpListaDeCompras = await ListedProduct.findOne({
            where: {
                ShoppingListId: listaDeComprasId,
                ProductId: productosEnLista[i].ProductId
            }
        })
        await lpListaDeCompras.destroy()

        cantProductos = 0;
    }
    res.status(201).json({ message: 'PRODUCTS_MOVED_SUCCESFULLY' })
})

app.listen(3000)

