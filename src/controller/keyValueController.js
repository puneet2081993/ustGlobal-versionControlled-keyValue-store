const {keyValueService} = require('../services')

/*
@param req accepts either only key in params or key with timestamp as query parameter
@param res send status with response
@param next acts as error handling callback
accepts either only or timestamp with key and returns it's respective key value
*/
let getKeyValue = async (req,res,next) => {
    try{
        let result
        if((req.params.key)&&(!req.query.timestamp)){
            result = await keyValueService.getKeyValue(req.params.key)
            res.status(200).send(result)
        } else if((req.params.key)&&(req.query.timestamp)){
            result = await keyValueService.getKeyValueByTimestamp(req.params.key,req.query.timestamp)
            res.status(200).send(result)
        } else {
            res.status(500).send('Invalid Request')
        }
    } catch (err) {
        next(err)
    }
}
/*
@param req accepts key and value
@param res send status with response
@param next acts as error handling callback
accepts key and value and either insert or update it's respective key value
*/
let insertOrUpdateKey = async (req,res,next) => {
    try{
        let key, value
        key = (req.body)?Object.keys(req.body)[0]:null
        value = (req.body[key])?req.body[key]:null
        if((key!==null)&&(value!==null)){
            let result = await keyValueService.insertOrUpdateKey(key,value)
            res.status(200).send(result)
        } else {
            res.status(500).send('Invalid post request')            
        }
    } catch (err) {
        next(err)
    }
}
// exporting all controller functions
module.exports = {
    getKeyValue,
    insertOrUpdateKey      
}