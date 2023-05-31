require('dotenv').config()
const express = require('express')
const {  mle: encryption }  = require('./src/commons/index.js');

const app = express()

app.use(express.json())

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

app.post('/encrypt', async (req, res) => {
  console.log('encrypt', req.body)
  const encryptedData = await encryption.encryptData(req.body.data);
  return res.send(encryptedData).status(200)
})

app.post('/decrypt', async (req, res) => {
  console.log('decrypt')
  const decryptedData = await encryption.decryptData(req.body.data)
  return res.send(decryptedData).status(200)
})

// Create RSA keys 

// decrypt the request

// do the processing 

// encrypt the response 

// capture the response before the response is sent to client


