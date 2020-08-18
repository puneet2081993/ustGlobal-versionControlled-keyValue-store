
// const dotenv  = require('dotenv').config()

let node_env = process.NODE_ENV
let port = process.env.PORT
let database_url = process.env.DB_URL
let database = process.env.DB

module.exports = {
    env : node_env, 
    port : port ,
    dbURL : database_url,
    database : database 
}