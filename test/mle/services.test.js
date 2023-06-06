const { expect } = require('chai')
const Chance = require('chance')
const rewire = require('rewire')
const sinon = require('sinon')
const nodeJose = require('node-jose')

const mleServices = rewire('../../src/mle/services.js')

const getMleKeys = { getMleKeys: mleServices.__get__('getMleKeys') }

const chance = new Chance()

describe('MlE services test suit', () => {
  const mockedEncryptedData = chance.hash({ length: 512 })
  const mockedDecryptedData = { name: chance.name(), age: chance.age() }
  
  beforeEach(() => {
    const stubGetMleKeys = sinon.stub(getMleKeys, 'getMleKeys').returns({ id: chance.hash({ length: 32 }), publicKey: chance.hash({ length: 512 })})
    sinon.stub(nodeJose.JWK, 'createKeyStore').callsFake(() => ({ add: () => new Promise((res, rej) => { res() }) }))
    sinon.stub(nodeJose.JWE, 'createEncrypt').callsFake(() => ({ update: () => ({ final: () => new Promise((res, rej) => { res(mockedEncryptedData) }) }) }))
    sinon.stub(nodeJose.JWE, 'createDecrypt').callsFake(() => ({ decrypt: (key) => new Promise((res, rej) => { res({ payload:  JSON.stringify(mockedDecryptedData)}) }) }) )
    mleServices.__set__('getMleKeys', stubGetMleKeys)
    })
  afterEach(() => { sinon.restore() } )
      
  it('Should encrypt data', async () => {

    const mleId = chance.hash({ length: 32 })
    const data = {name: chance.name(), age: chance.age() }

    const encryptedData = await mleServices.encryptData(mleId, data)
    expect(encryptedData).to.be.deep.equal({ encData: mockedEncryptedData })

  })

  it('Should not encrypt data and throw error "Key not found"', async () => {
    sinon.restore()
    const stubMleKeys = sinon.stub(getMleKeys, 'getMleKeys').returns(undefined) 
    mleServices.__set__('getMleKeys', stubMleKeys)

    const mleId = chance.hash({ lenght: 32 })
    const data = { name: chance.name(), age: chance.age() }

    try {
      await mleServices.encryptData(mleId, data)
    } catch(err) {
      expect(err.message).to.equal("Key not found")
    }
  })

  it('Should decrypt data', async () => {
    const mleId = chance.hash({ length: 32 })
    const data = chance.hash({ length: 512 })

    const decryptedData = await mleServices.decryptData(mleId, data)
    expect(decryptedData).to.deep.equal(mockedDecryptedData)
  })

  it('Should not encrypt data and throw error "Key not found"', async() => {
    sinon.restore()
    const stubMleKeys = sinon.stub(getMleKeys, 'getMleKeys').returns(undefined)
    mleServices.__set__('getMleKeys', stubMleKeys)

    const mleId = chance.hash({ length: 32 })
    const data = chance.hash({ length: 512 })

    try {
      await mleServices.decryptData(mleId, data)
    } catch(err) {
      expect(err.message).to.equal("Key not found")
    }
  })
})
