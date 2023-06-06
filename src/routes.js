const controller = require('./controller')

const routes = (app) => {
  app.post('/encrypt', async (req, res) => {
    const { body } = req
    const data = await controller.encrypt(body)
    return res.status(200).send(data)
  })

  app.post('/decrypt', async (req, res) => {
    const { body } = req
    const data = await controller.decrypt(body)
    return res.status(200).send(data)
  })
}

module.exports = routes
