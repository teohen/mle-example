const controller = require('./controller')

const routes = (app) => {
  app.post('/clients', (req, res) => {
    const { body } = req
    
    if (!body) {
      const errorMessage = 'Missing body'
      console.log(errorMessage)
      return res.status(400).send(errorMessage)
    }

    if (!body.dateOfBirth) {
      const errorMessage = 'Missing required property: dateOfBirth'
      console.error(errorMessage)
      return res.status(400).send(errorMessage)
    }

    if (!body.name) {
      const errorMessage = 'Missing required property: name'
      console.error(errorMessage)
      return res.status(400).send(errorMessage)
    }

    const savedClient = controller.save(body)

    return res.status(201).send(savedClient)
  })

  app.get('/clients', (req, res) => {
    const clients = controller.findAll()

    return res.status(200).send(clients)
  })

  app.get('/clients/:id', (req, res) => {
    const { id } = req.params
    const client = controller.find(id)
    return res.status(200).send(client)
  })
}


module.exports =  routes
