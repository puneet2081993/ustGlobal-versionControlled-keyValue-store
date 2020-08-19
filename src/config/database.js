const {dbURL} = require('../vars')
let mongoose = require('mongoose')

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
    console.log(String(dbURL))
     mongoose.connect(String(dbURL),{useNewUrlParser: true})
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
           console.log(err)
         console.error('Database connection error')
       })
  }
}

module.exports = new Database()