const controller = require('./controller')

const routes = (app) => {
  app.post('/clients', (req, res) => {
    const { body } = req
    const savedClient = controller.save(body)

    return res.send(savedClient).status(200)
  })

  app.get('/clients', (req, res) => {
    const clients = controller.findAll()

    return res.send(clients).status(200)
  })

  app.get('/clients/:id', (req, res) => {
    const { id } = req.params
    const client = controller.find(id)
    return res.send(client).status(200)
  })
}


module.exports =  routes
