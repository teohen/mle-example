const clients = []

const getAll = () => {
  return clients
}

const save = (client) => {
  clients.push(client)
}

const get = (id) => {
  return clients.find((client) => client.id === id)
}

module.exports = {
  getAll,
  save,
  get
}
