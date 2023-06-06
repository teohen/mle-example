const request = require('supertest')
const chai  = require('chai')
const sinon = require('sinon')
const crypto = require('crypto')
const Chance = require('chance')
chai.use(require('sinon-chai'))

const chance = new Chance()
const fixtures = require('./fixtures.js')
const app = require('../../index.js')
const services = require('../../src/clients/services.js')
const controller = require('../../src/clients/controller.js')
const expect = chai.expect

describe('Clients routes TEST SUIT', async() => {

  afterEach(() => {
    sinon.restore()
  })

  it('Should create a client', async () => {
    const uuid = chance.hash({ length: 32 })
    sinon.stub(crypto, 'randomUUID').returns(uuid)

    const client = fixtures.getNewClient()
    delete client.id
    try {
      const { body } = await request(app).post('/clients').send(client).expect(201)
 
      expect(body).to.be.ok
      expect(body.id).to.be.equal(uuid)
      expect(body.name).to.be.equal(client.name)
      expect(body.dateOfBirth).to.be.equal(client.dateOfBirth)
    } catch(err) {
      console.log('erro', err)
      throw err
    }
  })

  it('Should return 500 when an internal error happens', async () => {
    const client = fixtures.getNewClient()
    delete client.id

    sinon.stub(controller, 'save').throws(new Error('Some Error'))

    const result = await request(app).post('/clients').send(client).expect(500)

    expect(result.text).to.equal('Internal Server Error')
  })


  it('Should not create a client when dateOfBirth property is not sent', async () => {
    const client = fixtures.getNewClient()
    delete client.id
    delete client.dateOfBirth

    const spyLogger = sinon.spy(console, 'error')
    
    try {
	await request(app).post('/clients').send(client).expect(400)
    } catch(err) {
      expect(spyLogger).to.have.been.calledWith('Missing required property: dateOfBirth')
      throw err 
    }
  })

  it('Should not create a client when name property is not sent', async () => {
    const client = fixtures.getNewClient()
    delete client.id
    delete client.name

    const spyLogger = sinon.spy(console, 'error')

    try {
      await request(app).post('/clients').send(client).expect(400)
    } catch (err) {
      expect(spyLogger).to.have.been.calledWith('Missing required property: name')
      throw err
    }
  })
  
  it('Should return all saved client correctly', async () => {
    const clients = [fixtures.getNewClient(), fixtures.getNewClient(), fixtures.getNewClient()]
    sinon.stub(services, 'getAll').returns(clients)

    try {
      const { body } = await request(app).get('/clients').expect(200)
    
      expect(body).to.be.ok
      expect(body).to.be.an('array').that.lengthOf(3)

      body.forEach((client) => {
        expect(client).to.have.property('id')
        expect(client).to.have.property('dateOfBirth')
        expect(client).to.have.property('name')
      })
    } catch(err) {
      throw err
    }
  })

  it('Should return a client', async () => {
    const client = fixtures.getNewClient()
    sinon.stub(services, 'get').returns(client)

    try {
      const { body } = await request(app).get(`/clients/${client.id}`).expect(200)
  
      expect(body).to.be.ok
      expect(body.id).to.be.equal(client.id)
      expect(body.name).to.be.equal(client.name)
      expect(body.dateOfBirth).to.be.equal(client.dateOfBirth)
    } catch(err) {
      throw err
    }
  })

  it('Should not return a client when its id is not found', async () => {
    sinon.stub(services, 'get').returns(undefined)
    
    try {
      const { body } = await request(app).get(`/clients/${chance.hash({ length: 32 })}`).expect(200)
      expect(body).to.be.empty
    } catch(err) {
      throw err
    }
  })

})
