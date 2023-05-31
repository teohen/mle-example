const controller = require('./controller')

const routes = (app) => {
  app.post('/encrypt', async (req, res) => {
    const { body } = req
    const data = await controller.encrypt(body)
    return res.send(data).status(200)
  })

  app.post('/decrypt', async (req, res) => {
    const { body } = req
    const data = await controller.decrypt(body)
    return res.send(data).status(200)
  })
}

module.exports = routes
