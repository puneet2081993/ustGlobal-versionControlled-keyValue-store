const {dbURL} = require('../vars')
let mongoose = require('mongoose')

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
    console.log(String(dbURL))
     mongoose.connect('mongodb://heroku_rsw0c9l9:73t43tj044e3eig8rtccghaafr@ds031721.mlab.com:31721/heroku_rsw0c9l9',{useNewUrlParser: true})
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