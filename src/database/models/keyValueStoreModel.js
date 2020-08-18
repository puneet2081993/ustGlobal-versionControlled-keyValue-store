var mongoose = require('mongoose');
let {isoDate} = require('../../helper/dateHelper')
//Declaring Key Value Store Schema
var Schema = mongoose.Schema;

//Initializing Key Value store Schema
var keyValueStoreSchema = new Schema({
    key: String,
    value: Schema.Types.Mixed,
    expired: Boolean,
    history: Array(),
    createdAt: Date,
    updatedAt: {
        type:Date,
        default:isoDate
    }
})
// Compiling key value store schema
var keyValueStoreModel = mongoose.model('keyValueStore', keyValueStoreSchema)

//exporting schema model
module.exports = {
    keyValueStoreModel
}