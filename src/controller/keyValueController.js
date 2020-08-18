const {keyValueService} = require('../services')

let getKeyValue = async (req,res,next) => {
    try{
        let result
        if((req.params.key)&&(!req.query.timestamp)){
            result = await keyValueService.getKeyValue(req.params.key)
        }
        console.log(req.params.mykey, result)
        res.status(200).send(result)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getKeyValue     
}