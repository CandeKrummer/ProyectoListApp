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

    -   
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

})