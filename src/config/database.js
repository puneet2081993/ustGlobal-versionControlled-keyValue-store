const {dbURL} = require('../vars')
let mongoose = require('mongoose')

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`${dbURL}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new Database()