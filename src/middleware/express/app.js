const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {keyValue} = require('../../routes')
const errorHandler = require('../../middleware/errorHandler/errorHandler')

//body-parser for req and res
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
app.use(bodyParser.json())

app.use(keyValue)
// custom middleware for errror handling
// app.use(errorHandler)


module.exports = {
    app
}