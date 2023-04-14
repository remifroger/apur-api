const server = require('../app.js')
const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
chai.should()
chai.use(chaiHttp)

const apiArchitecture = [
    {
        "theme": "sample",
        "indicateurs": ["ind1", "ind2"]
    }
]

const apiTerritoires = [
    {
        "echelle": "com",
        "territoire": "35238"
    }, {
        "echelle": "epci",
        "territoire": "243500139"
    }, {
        "echelle": "au",
        "territoire": "011"
    }, {
        "echelle": "dep",
        "territoire": "35"
    }
]

const apiRoutes = []

apiTerritoires.forEach((terr) => {
    apiArchitecture.forEach((obj) => {
        obj.indicateurs.forEach((ind) => {
            apiRoutes.push(`/api/data?theme=${obj.theme}&indicateur=${ind}&echelle=${terr.echelle}&territoire=${terr.territoire}`)
        })
    })
})

describe('Data API', () => {
    describe('Test get route api/data/', () => {
        apiRoutes.forEach((route) => {
            it(route + " should return data", (done) => {
                chai.request(server)
                    .get(route)
                    .end((err, response) => {
                        response.should.have.status(200)
                        response.body.should.be.a('object')
                        response.body.should.have.property('data')
                        response.body.data.should.be.a('array')
                        done()
                    })
            })
        })
    })
    describe('Test get route api/appConfig/', () => {
        it("It should return data", (done) => {
            chai.request(server)
                .get('/api/appConfig')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('data')
                    response.body.data.should.be.a('object')
                    response.body.data.should.have.property('config')
                    response.body.data.config.should.have.property('geo')
                    response.body.data.should.have.property('access')
                    response.body.data.access.should.be.a('array')
                    expect(response.body.data.access).to.have.lengthOf(6)
                    done()
                })
        })
    })
    describe('Test get route api/territoires/', () => {
        it("It should return data", (done) => {
            chai.request(server)
                .get('/api/territoires')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('data')
                    response.body.data.should.be.a('array')
                    response.body.data[0].should.have.property('echelle')
                    response.body.data[0].should.have.property('echelle_meta')
                    response.body.data[0].should.have.property('code_geo')
                    response.body.data[0].should.have.property('lib_geo')
                    done()
                })
        })
    })
    describe('Test get route api/territoiresId/', () => {
        const apiTerrRoutes = []
        apiTerritoires.forEach((o) => {
            apiTerrRoutes.push(`/api/territoiresId?echelle=${o.echelle}&territoire=${o.territoire}`)
        })
        apiTerrRoutes.forEach((route) => {
            it(route + " should return data", (done) => {
                chai.request(server)
                    .get(route)
                    .end((err, response) => {
                        response.should.have.status(200)
                        response.body.should.be.a('object')
                        response.body.should.have.property('data')
                        response.body.data.should.be.a('array')
                        response.body.data[0].should.have.property('echelle')
                        response.body.data[0].should.have.property('echelle_meta')
                        response.body.data[0].should.have.property('code_geo')
                        response.body.data[0].should.have.property('lib_geo')
                        done()
                    })
            })
        })
    })
})