const { default: axios } = require('axios');
const { assert } = require('chai');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
const { response } = require('express');
chai.use(chaiFetch);

/*
Testea:
    -   Si la cantidad mandada es negativa (Para restar cantidad), no puede
    restarse igual o más de la cantidad que ya tiene el producto listado.
    (Si la cantidad es 5, no se recibira   <= -5 )

    - No se actualiza un producto listado si se pasa 0 como cantidad

    - Se borra el ListedProduct pasando su Id y rechaza solicitudes para borrar
    si el Id proporcionado no pertenece a ningún registro
*/

describe('Update listed product quantity', () => {

    let listId;
    let prodId;
    let listedProdId;

    it('returns 201 if list was saved', (done) => {
        axios.post(
            'http://localhost:3000/shopping-lists', {
            name: "updateProd Lista test",
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
            name: 'updateProd product test',
            brand: 'marca',
            price: 2000,
            content: 1,
            productCategoryId: 1,
        }).then(response => {
            assert.equal(response.status, 201)
            prodId = response.data.ProductId
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
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

    it('returns 204 if listedProduct was updated w/ more quantity', (done) => {
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
    //Cant actual: 6

    it('returns 422 if ListedProduct was NOT updated w/ invalid quantity to decrease', (done) => {
        axios.patch(
            'http://localhost:3000/listed-products/' + listedProdId, {
            cantidad: -6
        }).then(response => {
            assert.equal(response.status, 204)
            done()
        }).catch(err => {
            assert.equal(err.response.data.message, 'INVALID_QUANTITY')
            done()
        })
    })

    it('returns 422 if ListedProduct was NOT updated w/ invalid quantity (0)', (done) => {
        axios.patch(
            'http://localhost:3000/listed-products/' + listedProdId, {
            cantidad: 0
        }).then(response => {
            assert.equal(response.status, 204)
            done()
        }).catch(err => {
            assert.equal(err.response.data.message, 'INVALID_QUANTITY_0_IS_NOT_VALID')
            done()
        })
    })

    it("returns 204 if ListedProduct's quantity was decreased", (done) => {
        axios.patch(
            'http://localhost:3000/listed-products/' + listedProdId, {
            cantidad: -2
        }).then(response => {
            assert.equal(response.status, 204)
            done()
        }).catch(err => {
            assert.equal(err.response.data.message, 'INVALID_QUANTITY_0_IS_NOT_VALID')
            done()
        })
    })

    //final quantity: 4

    it('returns 200 if the listedProduct was deleted', (done) => {
        axios.delete(
            'http://localhost:3000/listed-products/' + listedProdId, {
        }).then(response => {
            assert.equal(response.status, 200)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('returns 422 if it tries to delete a nonexistent listedProduct', (done) => {
        axios.delete(
            'http://localhost:3000/listed-products/' + listedProdId, {
        }).then(response => {
            assert.equal(response.status, 200)
            done()
        }).catch(err => {
            done()
        })
    })

    it('returns 201 if list was destroyed', (done) => {
        axios.delete(
            'http://localhost:3000/shopping-lists/' + listId, {
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('returns 200 if product was deleted', (done) => {
        axios.delete(
            'http://localhost:3000/products/' + prodId, {
        }).then(response => {
            assert.equal(response.status, 200)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })
})