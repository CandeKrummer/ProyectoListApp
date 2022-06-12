const { default: axios } = require('axios');
const { assert } = require('chai');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
const { response } = require('express');
chai.use(chaiFetch);

describe('Create new Shopping List', () => {
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
})