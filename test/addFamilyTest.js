const { default: axios } = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const { assert } = chai;

describe('Add Family', (done) => {
    it('', () => {

        axios({
            method: 'post',
            url: 'http://localhost:3000/family',
            data: {
                name: "Garcia",
                address: "Pellerman 42",
                number: "4343-4343",
                password: "garcia20"
            }
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            console.log(err.response.status)
            done()
        })
    })
})