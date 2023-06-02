const Chance = require('chance')
const crypto = require('crypto')

const chance = new Chance()

const getNewClient = () => ({
  id: crypto.randomUUID(),
  name: chance.name(),
  dateOfBirth: chance.birthday({ type: 'adult' }).toISOString()
})

module.exports = {
  getNewClient
}
