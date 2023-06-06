const request = require('supertest')
const Chance = require('chance')
const sinon = require('sinon')
const { expect } = require('chai')
const mleServices = require('../../src/mle/services.js')

const app = require('../../index.js')
const fixtures = require('./fixtures.js')

const chance = new Chance()

describe('MLE Client routes', () => {
  it('Should create a cliente using the mle feature', async () => {
    const client = fixtures.getNewClient()
    delete client.id
    const mleId = chance.hash({ length: 32 })
    const mockedEncryptedResponseBody = chance.hash({ lentgh: 512 })
    const mockedDecryptedRequestBody = client

    sinon.stub(mleServices, 'encryptData').returns(mockedEncryptedResponseBody)
    sinon.stub(mleServices, 'decryptData').returns(mockedDecryptedRequestBody)

    const data = await request(app).post('/clients').set({ encrypted: true, 'mle': mleId }).send({ encData: chance.hash({ length: 521 }) }).expect(201)
    expect(data.body).to.be.deep.equal({ encData: mockedEncryptedResponseBody })
  })

  it('Should return 400 when the mle id header is not sent', async () => {
    const result = await request(app).post('/clients').set({ encrypted: true }).send({ encData: chance.hash({ length: 512 }) }).expect(400)
    expect(result.text).to.equal('Missing mle header')
  })
})
