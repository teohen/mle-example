const controller = require('./controller')
const mleServices = require('../mle/services.js')

const interceptedSend = async (app) => {
  app.use((req, res, next) => {
    if (req.headers['mle'] && req.headers.encrypted === 'true') {
      const oldSend = res.send
      res.send = async function (data) {
        const mleId = req.headers['mle']
        const encryptedData = await mleServices.encryptData(mleId, data)
        res.send = oldSend
        return res.send({ encData: encryptedData })
      }
    }
    next()
  })
}

const decryptionMiddleware = async (req, res, next) => {
  const encrypted = req.headers.encrypted
  const mleId = req.headers.mle
  if (encrypted) {
    if (!mleId) {
      const errorMessage = 'Missing mle header'
      console.error(errorMessage)
      return res.status(400).send(errorMessage)
    }
    const decryptedData = await mleServices.decryptData(mleId, req.body.encData)
    req.body = decryptedData
  }
  next()
}

const routes = (app) => {
  interceptedSend(app)
  app.post('/clients', decryptionMiddleware, async (req, res) => {
    try {
      const { body } = req

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
    } catch (err) {
      console.error('Error trying to create client', err)
      res.sendStatus(500)
    }

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


module.exports = routes
