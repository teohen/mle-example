const nodeJose = require('node-jose')

let keyStore = null

const initKeyStore = () => {
    if (!keyStore) {
        keyStore = nodeJose.JWK.createKeyStore()
    }
    return keyStore
}


module.exports = initKeyStore
