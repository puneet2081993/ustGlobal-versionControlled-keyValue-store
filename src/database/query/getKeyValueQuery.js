const {keyValueStoreModel} = require('../models/keyValueStoreModel')
let {isoDate} = require('../../helper')
require('../../config/database')
/*
@param key
this query gets recent value based on key passed 
*/
let getKeyValue = async (key) => {
    let result = null
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
    let result = null
    await keyValueStoreModel.findOne({'expired':false,'key':key,'updatedAt':{'$lte':timestamp}})
    .then((response)=>{
        result = response
    })
    
    return result
}
/*
@param key
@param value
this query inserts new object either based on time bucket i.e 60 min or if no record exist, for its respective key
*/
let insertKeyValue = async (key,value) => {
    let result = null
    await keyValueStoreModel.create({'expired':false,'key':key,'value':value,'createdAt':isoDate()})
    .then((response)=>{
        result = response
    })
    console.log('Insert Query', result, typeof result)
    return result
}
/*
@param key
@param value
@param record : old record value 
this query updates existing key to new value based, saves old value and timestamp into history object.
*/
let updateKeyValue = async (key,value,record) => {
    let result = null
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
    let result = null
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
    let res = null
    let record = await getKeyValue(key)
    if(record == null){
        res = await insertKeyValue(key,value)
    } else if((record['createdAt'])&&((isoDate()-record['createdAt'])/60e3)> 3){
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