const nodeJose = require('node-jose')

 
const encryptData = (data, publicKey) => {
  if (!publicKey) {
    console.log('MISSING PUBLIC KEY')
    throw new Error('Missing public key') 
  }
  const stringData = typeof data === 'string' ? data : JSON.stringify(data)
  const keyStore = nodeJose.JWK.createKeyStore()
  const encryptionProperties = {
    alg: 'RSA-OAEP-256',
    enc: 'A128GCM'
  }
  return keyStore.add(publicKey, 'pem', encryptionProperties).
    then((key) => nodeJose.JWE.createEncrypt({
      format: 'compact',
      fields: {
        enc: 'A128GCM',
        iat: Date.now()
      }
    }, key)
       .update(stringData)
       .final()
       .then((result) => ({encryptedData: result})
    ))
}

const decryptData = (encryptedData, privateKey) => {
  const encryptedPayload = typeof encryptedData == 'string' ? JSON.parse(encryptedData) : encryptedData
  const  keystore = nodeJose.JWK.createKeyStore()
    let decProps = {
        alg: 'RSA-OAEP-256',
        enc: 'A128GCM'
    };
    return keystore.add(privateKey, 'pem', decProps)
        .then((key) => {
            return nodeJose.JWE.createDecrypt(key)
                .decrypt(encryptedPayload.data.encData)
                .then((result) => {
                    return JSON.parse(result.payload)
                })
        })
}

module.exports = {
  encryptData,
  decryptData
}
