const { mle } = require('./commons')

const encrypt = async (data) => {
  const encryptedData = await mle.encryptData(data)
  return encryptedData
}

const decrypt = async (data) => {
  const decryptedData = await mle.decryptData(data)
  return decryptedData
}

module.exports ={
  encrypt, 
  decrypt
}
