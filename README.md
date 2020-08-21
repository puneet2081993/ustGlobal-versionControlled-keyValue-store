# ustGlobal-versionControlled-keyValue-store
This is hiring assignment for UST Global. Develop production ready version controlled key value store for string or JSON BLOB value.
## Technologies/Libraries used

Backend : Node.js, Express.js,

Database: MongoDB

Libraries: body-parse, dotenv, winston, mongoose, mocha, chai

## Structure
Considering dataset as a time-series data so I have modelled it into a bucket pattern i.e each document stores data in a bucket of 60 mins.
Post that new document will be inserted and old one we can set expired false.
## Sample database design
{

    "_id" : ObjectId("5f3c7a49347ab6108ca16e11"),   
    "history" : [
        {
            "value" : "1",
            "updatedAt" : ISODate("2020-08-19T06:33:05.736Z")
        },
        {
            "value" : "2",
            "updatedAt" : ISODate("2020-08-19T06:33:46.007Z")
        }
    ],
    "expired" : false,
    "key" : "pro",
    "value" : "3",
    "createdAt" : ISODate("2020-08-19T06:33:05.700Z"),
    "updatedAt" : ISODate("2020-08-19T06:34:06.371Z"),
    "__v" : 0
    
}

## HEROKU URL
https://powerful-peak-31565.herokuapp.com/object

## USAGE
**npm install**
**npm start**
**npm test**