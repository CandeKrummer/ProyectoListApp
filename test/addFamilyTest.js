const { default: axios } = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
/* app.use(express.json())
app.use(express.urlencoded({ extended: true })) */


const { assert } = chai;

describe('Add Family', (done) => {
    it('returns 201 if the family was created', (done) => {
        axios.post(
            'http://localhost:3000/family',
            {
                name: "Garcia",
                address: "Pellerman 42",
                number: "4343-4343",
                password: "garcia20"
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

    it('returns 422 if the family exists', (done) => {

        axios.post(
            'http://localhost:3000/family',
            {
                name: "Garcia",
                address: "Pellerman 42",
                number: "4343-4343",
                password: "garcia20"
            },
        ).catch(err => {
            assert.equal(err.response.data.message, "FAMILY_EXISTS")
            console.log(err.response.status + ' ' + err.response.data.message)
            done()
        })
    })
})