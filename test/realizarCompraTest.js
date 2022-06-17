const { default: axios } = require('axios');
const { assert } = require('chai');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
const { response } = require('express');
chai.use(chaiFetch);

describe('Move the products from the shopping list to the virtual cupboard', () => {
    let famId;
    let listaDeComprasId;
    let product1Id;
    let product2Id;

    it('returns 201 if the family and its lists were created', (done) => {
        axios.post(
            'http://localhost:3000/families',
            {
                name: "Family Test Realizar Compra",
                address: "Avenida",
                number: "34343434",
                password: "adinevA"
            }
        ).then(response => {
            assert.equal(response.status, 201)
            famId = response.data.familyId
            listaDeComprasId = response.data.listaDeComprasId
            alacenaVirtualId = response.data.alacenaVirtualId
            done()
        }).catch(err => {
            console.log("aca")
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('returns 201 if the first product was saved', (done) => {
        axios.post(
            'http://localhost:3000/products', {
            name: 'Producto 1 RealizarCompraTest',
            brand: 'marca',
            price: 550,
            content: "1 unidades",
            productCategoryId: 1,
        }).then(response => {
            assert.equal(response.status, 201)
            product1Id = response.data.ProductId
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('returns 201 if the second product was saved', (done) => {
        axios.post(
            'http://localhost:3000/products', {
            name: 'Producto 2 RealizarCompraTest',
            brand: 'marca',
            price: 500,
            content: "300 gr",
            productCategoryId: 2,
        }).then(response => {
            assert.equal(response.status, 201)
            product2Id = response.data.ProductId
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('returns 201 if the first product was saved in the shopping list', (done) => {
        axios.post(
            'http://localhost:3000/listed-products', {
            ShoppingListId: listaDeComprasId,
            ProductId: product1Id,
            cantidad: 3
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('returns 201 if the second product was saved in the shopping list', (done) => {
        axios.post(
            'http://localhost:3000/listed-products', {
            ShoppingListId: listaDeComprasId,
            ProductId: product2Id,
            cantidad: 2
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('returns 201 if the products were moved succesfully', (done) => {
        axios.patch(
            'http://localhost:3000/realizar-compra/' + famId, {
        }).then(response => {
            assert.equal(response.data.message, 'PRODUCTS_MOVED_SUCCESFULLY')
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })


    it('returns 422 if the shopping list is empty', (done) => {
        axios.patch(
            'http://localhost:3000/realizar-compra/' + famId, {
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('returns 200 if the family was deleted', (done) => {
        axios.delete(
            'http://localhost:3000/families/' + famId, {
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('returns 200 if the first product was deleted', (done) => {
        axios.delete(
            'http://localhost:3000/products/' + product1Id, {
        }).then(response => {
            assert.equal(response.status, 200)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('returns 200 if the second product was deleted', (done) => {
        axios.delete(
            'http://localhost:3000/products/' + product2Id, {
        }).then(response => {
            assert.equal(response.status, 200)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })
})
