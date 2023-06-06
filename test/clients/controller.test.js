const Chance = require('chance')
const { expect } = require('chai')
const sinon = require('sinon')
const crypto = require('crypto')

const { controller, services } = require('../../src/clients/')

const chance = new Chance()

const getNewClient = () => ({ id: crypto.randomUUID(), name: chance.name(), dateOfBirth: chance.birthday({ type: 'adult' }) })

describe('Clients SUIT test', () => {

  afterEach(() => {
    sinon.restore()
  })

  it('Should save a client', () => {
    const client = getNewClient()
    sinon.stub(services, 'save').returns(client)

    delete client.id
    const savedClient = controller.save(client)

    expect(savedClient).to.have.property('id')
    expect(savedClient.name).to.equal(client.name)
    expect(savedClient.dateOfBirth).to.equal(client.dateOfBirth)

  })

  it('Should find all clients', () => {
    const savedClients = [getNewClient(), getNewClient()]

    sinon.stub(services, 'getAll').returns(savedClients)

    const clients = controller.findAll()
    expect(clients).to.deep.equal(savedClients)
  })

  it('Should return an empty array when there no client is saved', () => {
    const clients = controller.findAll()

    expect(clients).to.be.an('array').that.is.empty
  })

  it('Should return a client', () => {
    const savedClient = getNewClient()
    sinon.stub(services, 'get').returns(savedClient)

    const client = controller.find(crypto.randomUUID())

    expect(client).to.equal(savedClient)
  })

  it('Should return a null  value if the client is not found', () => {
    sinon.stub(services, 'get').returns(undefined)

    const client = controller.find(crypto.randomUUID())
    expect(client).to.be.null
  })
})
