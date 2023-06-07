const rewire = require('rewire')
const Chance = require('chance')
const { expect } = require('chai')


const services = rewire('../../src/clients/services.js')
const fixtures = require('./fixtures')

const chance = new Chance()

describe('Services SUIT test', () => {
  const clientsList = [fixtures.getNewClient(), fixtures.getNewClient(), fixtures.getNewClient()]
  beforeEach(() => {
    services.__set__('clients', clientsList)
  })

  it('Should get all clients', () => {
    const clients = services.getAll()

    expect(clients).to.be.an('array').with.lengthOf(clientsList.length)
  })

  it('Should save a client', () => {
    const newClient = fixtures.getNewClient()
    const savedClients = services.__get__('clients')
    services.save(newClient)
    expect(savedClients.pop()).to.equal(newClient)
  })
  it('Should get one client', () => {
    const index = chance.integer({ min: 0, max: clientsList.length - 1 })
    const clientId = clientsList[index].id

    const client = services.get(clientId)

    expect(client).to.equal(clientsList[index])
  })

})
