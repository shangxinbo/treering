const mongoose = require('mongoose')


const HistorySchema = new mongoose.Schema({
    user_id: String,
    text: String,
    join_time:Date,
    end_time: Date
})

const History = mongoose.model('History', HistorySchema)

module.exports = History