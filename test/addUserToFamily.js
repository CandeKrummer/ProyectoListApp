const { default: axios } = require('axios');
const { assert } = require('chai');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
const { response } = require('express');
chai.use(chaiFetch);

/*

Testea:
    + que no se creen dos usuarios con un mismo email
    + Un mismo usuario no pueda agregarse dos veces a la misma familia

*/

describe('Add user to an existing family', () => {
    let famId
    let userId

    it('return 201 if the family was created', (done) => {
        axios.post(
            'http://localhost:3000/families',
            {
                name: "Test addUserToFamily",
                address: "Yatay 200",
                number: "4444-4444",
                password: "LosPerezosos123"
            }
        )
            .then(response => {
                assert.equal(response.status, 201)
                famId = response.data.familyId
                done()
            }).catch(err => {
                assert.equal(err.response.status, 422)
                done()
            })
    })

    it('return 201 if the user was created', (done) => {
        axios.post(
            'http://localhost:3000/users',
            {
                name: "test addUserToFamily",
                email: "test@test.com",
                password: "amoListApp",
            }
        )
            .then(response => {
                assert.equal(response.status, 201)
                userId = response.data.userId
                done()
            }).catch(err => {
                assert.equal(err.response.status, 422)
                done()
            })
    })

    it('return 201 if an user with the same email was NOT created', (done) => {
        axios.post(
            'http://localhost:3000/users',
            {
                name: "test2 addUserToFamily",
                email: "test@test.com",
                password: "amoListApp2",
            }
        ).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('return 422 if user doesn´t exist', (done) => {
        axios.post(
            'http://localhost:3000/familyUsers',
            {
                familyId: famId,
                userId: 123456
            }
        ).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            assert.equal(err.response.data.message, 'USER_DOESNT_EXIST')
            done()
        })
    })

    it('return 422 if the family doesn´t exist', (done) => {
        axios.post(
            'http://localhost:3000/familyUsers',
            {
                familyId: 123456,
                userId: userId
            }
        ).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            assert.equal(err.response.data.message, 'FAMILY_DOESNT_EXIST')
            done()
        })
    })

    it('return 201 if user was added to the family', (done) => {
        axios.post(
            'http://localhost:3000/familyUsers',
            {
                familyId: famId,
                userId: userId
            }
        ).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            assert.equal(err.response.data.message, 'ALREADY_JOINED_FAMILY')
            done()
        })
    })

    it('return 422 if user was already a family member', (done) => {
        axios.post(
            'http://localhost:3000/familyUsers',
            {
                familyId: famId,
                userId: userId
            }
        ).catch(err => {
            assert.equal(err.response.data.message, 'ALREADY_JOINED_FAMILY')
            done()
        })
    })

    it('returns 200 if the family was deleted', (done) => {
        axios.delete(
            'http://localhost:3000/families/' + famId, {
        }).then(response => {
            assert.equal(response.status, 201)
            console.log("hola")
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            console.log("chau")
            done()
        })
    })

})