const { default: axios } = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
/* app.use(express.json())
app.use(express.urlencoded({ extended: true })) */


const { assert } = chai;
describe('Search Families', (done) => {
    it('returns 201 if the family was found succesfully', () => {

        axios({
            method: 'get',
            url: 'http://localhost:3000/family',
            data: { name: "", brand: "", }
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            console.log(err.response.status)
            done()
        })
    })
    it('returns 422 if the family doesnt exist', () => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/family',
            data: { name: "", brand: "", }
        }).then(response => {
            assert.equal(response.status, 422)
            done()
        }).catch(err => {
            assert.equal(err.response.data.message, "FAMILY_DOESNT_EXIST")
            console.log(err.response.status + ' ' + err.response.data.message)
            done()
        })
    })
})