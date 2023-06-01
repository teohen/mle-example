require('dotenv').config()
const express = require('express')
const { routes: clientsRoutes } = require('./src/clients')
const app = express()


app.use(express.json())
clientsRoutes(app)

const PORT = 3000

//app.use((req, res, next) => {
//    const oldSend = res.send
//    res.send = function(data) {
//        const encryptedData = encryption.encryptData(data).then((data) => console.log('encry', data));
  //      const newData = "modified " + data
//        res.send = oldSend
//        return res.send(newData)
//        return res.send(data)
//    }
//    next()
//})

const decryptMiddleware = (req, res, next) => {
  const decryptedData = encryption.decryptData(req.body)
  console.log('dec', decryptedData)
}

app.listen(PORT, () => {
  console.log(`App listening to the port: ${PORT}`)
})

app.get('/', (req, res) => {
  res.send('all ok').status(200)
})

module.exports = app

// TODO: create the MLE funcionality and the tests for it!

// TODO: create the integration tests for the clients routes
