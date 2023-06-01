const crypto = require('crypto')
const services = require('./services.js')


const save = (client) => {
  const newClient = { ...client, id: crypto.randomUUID() }
  services.save(newClient)
  return newClient
}

const findAll = () => {
  const clients = services.getAll()
  return clients  
}

const find = (id) => {
  const client = services.get(id)
  if (!client) {
    return null   
  }
  return client
}

module.exports = {
  save,
  findAll,
  find
}
