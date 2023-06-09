require('dotenv').config()
const express = require('express')
const { routes: clientsRoutes } = require('./src/clients')
const app = express()


app.use(express.json())
clientsRoutes(app)

const PORT = 3000


app.listen(PORT, () => {
  console.log(`App listening to the port: ${PORT}`)
})

module.exports = app


