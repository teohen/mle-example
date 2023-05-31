require('dotenv').config()
const express = require('express')
const routes = require('./src/routes.js')
const app = express()


app.use(express.json())
routes(app)

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

// TODO: create tests for the encrytp/decrypt module
// TODO: create a separate routes file
// TODO: create the route that will handle the requests
