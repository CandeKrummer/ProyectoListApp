const { default: axios } = require('axios');
const { assert } = require('chai');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
const { response } = require('express');
chai.use(chaiFetch);

/*
Testea:
    -   Si se quiere un producto a la lista tiene que existir la lista 
        y el producto previamente
    
    -   Si se quiere actualizar la cantidad del producto lista, no se agrega
        un nuevo registro, sino que solamente se modifica la cantidad

    -   Si recibe una cantidad para actualizar o crear el prod listado negativa,
        se convierte en positiva y realiza la modificación del registro
        
    -   Si se recibe 0 como cantidad para el producto listado, no se crea/actualiza el registro

*/
describe('Add a product to a shopping list ', () => {
    let listId;
    let prodId;
    let listedProdId;

    it('returns 201 if list was saved', (done) => {
        axios.post(
            'http://localhost:3000/shopping-lists', {
            name: "addProd Lista test",
            listCategoryId: 1,
            familyId: 1,
        }
        )
            .then(response => {
                assert.equal(response.status, 201)
                listId = response.data.shoppingListId
                done()
            }).catch(err => {
                assert.equal(err.response.status, 422)
                done()
            })
    })

    it('returns 201 if product was saved', (done) => {
        axios.post(
            'http://localhost:3000/products', {
            name: 'addProd product test',
            brand: 'marca',
            price: 1000,
            content: 1,
            productCategoryId: 1,
            productMeassureId: 1,
        }).then(response => {
            assert.equal(response.status, 201)
            prodId = response.data.ProductId
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('returns 422 if quantity is not valid', (done) => {
        axios.post(
            'http://localhost:3000/listed-products', {
            ShoppingListId: listId,
            ProductId: prodId,
            cantidad: 0
        }).catch(err => {
            assert.equal(err.response.data.message, "INVALID_QUANTITY")
            done()
        })
    })

    it('returns 422 if list does not exist', (done) => {
        axios.post(
            'http://localhost:3000/listed-products', {
            ShoppingListId: 1235,
            ProductId: prodId,
            cantidad: 2
        }).catch(err => {
            assert.equal(err.response.data.message, 'UNDEFINED_LIST')
            done()
        })
    })

    it('returns 422 if product does not exist', (done) => {
        axios.post(
            'http://localhost:3000/listed-products', {
            ShoppingListId: listId,
            ProductId: 125,
            cantidad: 2
        }).catch(err => {
            assert.equal(err.response.data.message, 'UNDEFINED_PRODUCT')
            done()
        })
    })


    it('returns 201 if listedProduct was saved', (done) => {
        axios.post(
            'http://localhost:3000/listed-products', {
            ShoppingListId: listId,
            ProductId: prodId,
            cantidad: 3
        }).then(response => {
            listedProdId = response.data.listedProductId
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('returns 204 if listedProduct was updated and not created', (done) => {
        axios.patch(
            'http://localhost:3000/listed-products/' + listedProdId, {
            cantidad: 3
        }).then(response => {
            assert.equal(response.status, 204)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('returns 204 if listedProduct was updated despite having a negative quantity input', (done) => {
        axios.patch(
            'http://localhost:3000/listed-products/' + listedProdId, {
            cantidad: -3
        }).then(response => {
            assert.equal(response.status, 204)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })


})
