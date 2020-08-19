const {keyValueStoreModel} = require('../models/keyValueStoreModel')
let {isoDate} = require('../../helper')
var mongoose = require('mongoose')
require('../../config/database')
/*
@param key
this query gets recent value based on key passed 
*/
let getKeyValue = async (key) => {
    let result = {}
    await keyValueStoreModel.findOne({'expired':false,'key':key})
    .then((response)=>{
        result = response
    })
    return result
}
/*
@param key
@param timestamp
this query gets recent active value based on key and timestamp passed 
*/
let getKeyValueByTimestamp = async (key,timestamp) => {
    let result = {}
    await keyValueStoreModel.aggregate([
        {
            '$match':{
                'key': key,
                'updatedAt':{
                    '$gte':timestamp
                    },
                
                'createdAt':{
                    '$lte':timestamp
                    }
                }
        },
        {
            '$unwind': '$history'
        },
        {
            '$match':{
                'history.updatedAt':{
                    '$lte':timestamp
                    }
                }
        },
        {
            '$sort':{
                'history.updatedAt':-1
                }
        },
        {
            '$limit':1
        },
        {
            '$project':{
                '_id':0,
                'expired':0,
                '__v':0,
                
                }
        }
    ])
    .then((response)=>{
        if(response[0]){
        result['value'] = new Date(response[0]['updatedAt'])>timestamp?response[0]['history']['value']:response[0]['value']
        }
    })
    return result
}
/*
@param key
@param value
this query inserts new object either based on time bucket i.e 60 min or if no record exist, for its respective key
*/
let insertKeyValue = async (key,value) => {
    let result = {}
    await keyValueStoreModel.create({'expired':false,'key':key,'value':value,'createdAt':isoDate()})
    .then((response)=>{
        result = response
    })
    return result
}
/*
@param key
@param value
@param record : old record value 
this query updates existing key to new value based, saves old value and timestamp into history object.
*/
let updateKeyValue = async (key,value,record) => {
    let result = {}
    await keyValueStoreModel.findOneAndUpdate({'expired':false,'key':key},{
        '$push':{
            "history":{
                "value":record['value'],
                "updatedAt":record['updatedAt']
            }
        },
        '$set':{
            'value': value,
            'updatedAt':isoDate()
        }
    },{
        new:true
    })
    .then((response)=>{
        result = response
    })
    return result
}
/*
@param key
@param expired
this query updates existing key expired status to true based on bucket criteria.
*/
let updateKeyExpired = async (key,expired) => {
    let result = {}
    await keyValueStoreModel.findOneAndUpdate({'expired':false,'key':key},{
        '$set':{
            'expired': expired
        }
    },{
        new : true
    })
    .then((response)=>{
        result = response
    })
    return result
}
/*
@param key
@param value
this function manages/wraps all activities regarding insert or update i.e 
If any previous record doesn't exist 
    it will create new record
If record exist but it's bucket time limit of 60 mins is done
    it will create new record and set previous expired to true.
If record exist and it's within bucket time limit of 60 mins
    it will make an update to the respective key and add old value with timestamp to history.
If no activity is performed 
    return null    
*/
let insertOrUpdate = async (key,value) => {
    let res = {}
    let record = await getKeyValue(key)
    if(record == null){
        res = await insertKeyValue(key,value)
    } else if((record['createdAt'])&&((isoDate()-record['createdAt'])/60e3)> 60){
        res = await updateKeyExpired(key,true)
        if(res.expired){
            record = await insertKeyValue(key,value)
            res = record
        } else {
            res = await updateKeyExpired(key,false)
            res = 'Could not insert value'
        }
    } else{        
        res = await updateKeyValue(key,value,record)
    }
    return res
}

//exporting all above mentioned queries
module.exports = {
    getKeyValue,
    getKeyValueByTimestamp,
    insertOrUpdate
}