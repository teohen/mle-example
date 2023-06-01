const { mle } = require('./commons')

const PRIVATE_KEY = process.env.PRIVATE_KEY
const PUBLIC_KEY = process.env.PUBLIC_KEY

const encrypt = async (data) => {
  console.log('PUBLIC KEY', PUBLIC_KEY)
  const encryptedData = await mle.encryptData(data, PUBLIC_KEY)
  return encryptedData
}

const decrypt = async (data) => {
  const decryptedData = await mle.decryptData(data, PRIVATE_KEY)
  return decryptedData
}

module.exports = {
  encrypt, 
  decrypt
}
