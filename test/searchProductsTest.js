const { default: axios } = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
/*app.use(express.json())
app.use(express.urlencoded({ extended: true }))*/


const { assert } = chai;

describe('Search Products', (done) => {
    it('returns 201 if the search was successful', () => {

        axios({
            method: 'get',
            url: 'http://localhost:3000/products',
            data: { name: "", brand: "", }
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            console.log(err.response.status)
            done()
        })
    })
    it('returns 201 if reverse the negative numbers', () => {

        axios({
            method: 'get',
            url: 'http://localhost:3000/products',
            data: { name: "", brand: "", price: "-74.31"}
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            console.log(err.response.status)
            done()
        })
    })
    it('returns 201 if respect prices between min and max', () => {

        axios({
            method: 'get',
            url: 'http://localhost:3000/products',
            data: { name: "", brand: "", precioMin: "200", precioMax: "500"}
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            console.log(err.response.status)
            done()
        })
    })
    it('returns 201 if reverse the min and the max if they are wrong', () => {

        axios({
            method: 'get',
            url: 'http://localhost:3000/products',
            data: { name: "", brand: "",precioMin: "300", precioMax: "200"}
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            console.log(err.response.status)
            done()
        })
    })
    it('returns 201 if there is no minimum and it sets it to 0', () => {

        axios({
            method: 'get',
            url: 'http://localhost:3000/products',
            data: { name: "", brand: "", precioMax: "200"}
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            console.log(err.response.status)
            done()
        })
    })
    it('returns 201 if there is only minimum, without maximum limit', () => {

        axios({
            method: 'get',
            url: 'http://localhost:3000/products',
            data: { name: "", brand: "", precioMin: "200"}
        }).then(response => {
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            console.log(err.response.status)
            done()
        })
    })
})