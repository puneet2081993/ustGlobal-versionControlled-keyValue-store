let getKeyValue = async(key) => {
    if(key!==null){
        let res = 'value1'
        res = res?{value:res} : 'No value found'
        return res
    } else {
        return {success:false, message:'Please Provide Key'}
    }
}


module.exports = {
    getKeyValue
}
