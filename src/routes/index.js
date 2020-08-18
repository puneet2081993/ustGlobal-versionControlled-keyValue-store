const express = require('express')
const keyValue = express()
const {keyValueRoute} = require('./keyValueRoute')

keyValue.use(keyValueRoute)

module.exports = {
    keyValue
}