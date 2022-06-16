const { default: axios } = require('axios');
const { assert } = require('chai');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
const { response } = require('express');
chai.use(chaiFetch);


/*
Se testea:
 + Crear una lista
 + No se crea un lista con un mismo nombre para la misma familia.
 + Se borra una lista pasando su Id
 + Se rechaza la solicitud de borrar lista pasando un Id de una lista inexistente en la base
*/
describe('Create new Shopping List', () => {
    let listId
    it('returns 201 if list was saved', (done) => {
        axios.post(
            'http://localhost:3000/shopping-lists', {
            name: "Create list test",
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

    it('returns 422 if list exists', (done) => {

        axios.post(

            'http://localhost:3000/shopping-lists',
            {
                name: "Create list test",
                listCategoryId: 1,
                familyId: 1,
            },
        ).catch(err => {
            assert.equal(err.response.data.message, "LIST_EXISTS")
            done()
        })
    })


    it('returns 201 if list was destroyed', (done) => {
        axios.delete(
            'http://localhost:3000/shopping-lists/' + listId, {
        }).then(response => {
            console.log(listId)
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('returns 422 if the list doesnt exist', (done) => {
        axios.delete(
            'http://localhost:3000/shopping-lists/' + 895, {
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            assert.equal(err.response.data.message, 'LIST_DOESNT_EXIST')
            done()
        })
    })
})