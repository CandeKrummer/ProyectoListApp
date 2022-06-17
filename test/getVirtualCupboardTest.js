const { default: axios } = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);


const { assert } = chai;
describe('Get Virtual Cupboard', () => {
    let famId;
    it('returns 201 if the family was created', (done) => {
        axios.post(
            'http://localhost:3000/families',
            {
                name: "Garcia",
                address: "Pellerman 42",
                number: "4343-4343",
                password: "garcia20"
            }
        ).then(response => {
            assert.equal(response.status, 201)
            famId = response.data.familyId
            done()
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('returns 201 if the virtual cupboard was found succesfully', (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/virtual-cupboard/' + famId,
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            done()
        })
    })

    it('returns 422 if the family doesnt exist', (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/virtual-cupboard/' + -1,
        }).then(response => {
            assert.equal(response.status, 422)
            done()
        }).catch(err => {
            assert.equal(err.response.data.message, "FAMILY_DOESNT_EXIST")
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
})


