const mongoose = require('mongoose')


const ImportantSchema = new mongoose.Schema({
    user_id: String,
    todo: Array,
    last_time: Date
})

const Important = mongoose.model('Important', ImportantSchema)

module.exports = Important