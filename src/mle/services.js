const nodeJose = require('node-jose')
const initKeyStore = require('./keystore')

const keys = [
  {
    id: process.env.KEY_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
  }
]

const getMleKeys = (id) => {
    return keys.find((key) => key.id === id)
}

const encryptData = async (mleId, data) => {
  const keysInfo = getMleKeys(mleId)

   if (!keysInfo) {
     console.log('Key not found')
     throw new Error('Key not found')
   }

   const stringData = typeof data === 'string' ? data : JSON.stringify(data)
   const keyStore = initKeyStore()
   const encryptionProperties = {
     alg: 'RSA-OAEP-256',
     enc: 'A128GCM',
     kid: keysInfo.id
   }

   return keyStore.add(keysInfo.publicKey, 'pem', encryptionProperties)
   .then((key) => {
       return nodeJose.JWE.createEncrypt({
           format: 'compact',
           fields: {
               'enc': 'A128GCM',
               'iat': Date.now()
           }
       }, key)
           .update(stringData)
           .final()
           .then((result) => {
               return { encData: result };
           });
  });
   }

const decryptData = async (mleId, encryptedData) => {
  const keysInfo = getMleKeys(mleId)

  if (!keysInfo){
    console.error("Key not found")
    throw new Error("Key not found")
  }

  const  keystore = initKeyStore()
    const decProps = {
        alg: 'RSA-OAEP-256',
        enc: 'A128GCM',
      kid: keysInfo.id
    };

    const key = await keystore.add(keysInfo.privateKey, 'pem', decProps)
    const result = await nodeJose.JWE.createDecrypt(key).decrypt(encryptedData)
    return JSON.parse(result.payload)
}  
  
module.exports = {
  encryptData,
  decryptData
}
