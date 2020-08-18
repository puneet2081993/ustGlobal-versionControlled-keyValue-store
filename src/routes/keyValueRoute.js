const express = require('express')
const keyValueRoute = express.Router()
const {keyValueController} = require('../controller')

keyValueRoute.get('/object/:key',keyValueController.getKeyValue)

module.exports =  {
    keyValueRoute
}
