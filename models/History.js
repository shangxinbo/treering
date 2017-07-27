const mongoose = require('mongoose')


const HistorySchema = new mongoose.Schema({
    user_id: String,
    text: String,
    status:Number,  //0 执行状态，1，成功状态，-1 失败状态
    end_time: Date
})

const History = mongoose.model('History', HistorySchema)

module.exports = History