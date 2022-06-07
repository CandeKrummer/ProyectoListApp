/*
- Que un producto no se agregue dos veces a la lista, sino que se aumente la cantidad del producto listado
RECIBE: IdProducto, IdLista, Cantidad

Crear una lista, HECHO
Crear un producto -> HECHO

[] Agregar un producto a la lista con una cantidad x
Crear un listedProduct
Verificar si el producto fue agregado previamente
    Si no devuelve nada, Hacer un POST del ListedProduct
        +Responder con 201 Created 
    Si fue agregado previamente, aumentar la cantidad del listed Product
            + Hacer un PUT para modificar la 
            -Responder con 200 si todo bien

[] Intentar agregar el producto nuevamente a la lista con un cantidad Y
Verificar que el producto exista
    + Traer     
*/

const { default: axios } = require('axios');
const { assert } = require('chai');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
const { response } = require('express');
chai.use(chaiFetch);

describe('Create list ', () => {
    it('returns 201 if list was saved', (done) => {
        axios.post(
            'http://localhost:3000/shopping-lists', {
            name: "Lista test",
            listCategoryId: 1
            // familyId: 1,
        }
        )
            .then(response => {
                assert.equal(response.status, 201)
                console.log(response.status)
                done()
            }).catch(err => {
                assert.equal(err.response.status, 422)
                console.log(err.response.status)
                done()
            })
    })

    it('returns 422 if list exists', (done) => {

        axios.post(

            'http://localhost:3000/shopping-lists',
            { name: "Lista test", listCategoryId: 1 },
        ).catch(err => {
            assert.equal(err.response.data.message, "LIST_EXISTS")
            console.log(err.response.status + ' ' + err.response.data.message)
            done()
        })
        // .catch(err => {
        //     assert.equal(err.response.data.message, 'LIST_EXISTS')
        //     console.log(err.response.status)
        //     done()
        // })
    })

    it('returns 201 if product was saved', (done) => {
        axios.post(
            'http://localhost:3000/products', {
            name: 'product test',
            brand: 'marca',
            price: 1000,
            content: 1,
            productCategoryId: 1,
            productMeassureId: 1,
        }).then(response => {
            assert.equal(response.status, 201)
            console.log(response.status)
            done() //Termina el test
        }).catch(err => {
            assert.equal(err.response.status, 422)
            console.log(err.response.status)
            // console.log(err)
            done()
        })
    })

    it('returns 422 if product exists', (done) => {

        axios.post(
            'http://localhost:3000/products', {
            name: 'product test',
            brand: 'marca',
            price: 1000,
            content: 1,
            productCategoryId: 1,
            contentMeassureId: 1,
        }).catch(err => {
            assert.equal(err.response.data.message, "PRODUCT_EXISTS")
            console.log(err.response.status)
            done()
        })

    })

    it('returns 201 if listedProduct was saved', (done) => {
        axios.post(
            'http://localhost:3000/listed-products', {
            ShoppingListId: 2,
            ProductId: 3,
            cantidad: 3
        }).then(response => {
            // assert.equal(response.data.message, "LISTED_PRODUCT_CREATED")
            assert.equal(response.status, 201)
            console.log(response.status)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            console.log(err.response.status)
            done()
        })
    })

    it('returns 204 if listedProduct was updated and not created', (done) => {
        axios.post(
            'http://localhost:3000/listed-products', {
            ShoppingListId: 2,
            ProductId: 3,
            cantidad: 3
        }).then(response => {
            assert.equal(response.status, 204)
            console.log(response.status)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            console.log(err.response.status)
            done()
        })
    })


})
//Usar after ? para borrar datos del test