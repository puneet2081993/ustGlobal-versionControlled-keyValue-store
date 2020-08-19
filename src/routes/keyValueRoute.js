const express = require('express')
const keyValueRoute = express.Router()
const {keyValueController} = require('../controller')

keyValueRoute.get('/object/:key',keyValueController.getKeyValue)
keyValueRoute.post('/object',keyValueController.insertOrUpdateKey)

module.exports =  {
    keyValueRoute
}
