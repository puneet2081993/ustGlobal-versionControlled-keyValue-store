var {keyValueQuery} = require('../database')
/*
@param key
service accepts key as a parameter and returns it's recent value
null check on key
converts key as string
*/
let getKeyValue = async(key) => {
    try {
        key = key?String(key):null
        if(key!==null){
            let res = await keyValueQuery.getKeyValue(key)
            res = (res&&(res!==null))?{value:res['value']} : 'No record Found'
            return res
        } else {
            return 'Invalid Key: Key can not be null'
        }
    } catch(ex) {
        throw new Error(ex)
    }
}
/*
@param key
@param timestamp
service accepts key and timestamp as a parameter and returns it's recent value
null check on key and timestamp
converts key as string and timestamp as date
*/
let getKeyValueByTimestamp = async (key,timestamp) => {
    try {
        key = key?String(key):null
        timestamp = timestamp?new Date(Number(timestamp)*1000):null
        if((key!==null)&&(timestamp!==null)){
            let res = await keyValueQuery.getKeyValueByTimestamp(key,timestamp)
            res = (res&&(res!==null))?{value:res['value']} : 'No record Found'
            return res
        } else {
            return "Invalid Key or Timestamp: Key or timestamp cannot be null"
        }
    } catch(ex) {
        throw new Error(ex)
    }
}
/*
@param key
@param value
service accepts key and value as a parameter and either insert or update it's value.
null check for key and value
*/
let insertOrUpdateKey = async (key,value)=> {
    try {
        key = key?String(key):null
        value = value?value:null
        if((key!==null)&&(value!==null)){
            let res = await keyValueQuery.insertOrUpdate(key,value)
            res = (res&&(res!==null))?{key:res['key'],value:res['value'],timestamp:(new Date(res['updatedAt'])/ 1000 | 0)} : 'Could not update value'
            return res
        } else {
            return 'Invalid Key or Value: Either key or value is null'
        }
    } catch(ex) {
        throw new Error(ex)
    }
}

//exporting all three services
module.exports = {
    getKeyValue,
    getKeyValueByTimestamp,
    insertOrUpdateKey
}