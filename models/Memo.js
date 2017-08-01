const mongoose = require('mongoose')


const MemoSchema = new mongoose.Schema({
    user_id: String,
    content: String,
    last_time: Date
})

const Memo = mongoose.model('Memo', MemoSchema)

module.exports = Memo