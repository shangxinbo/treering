const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    user_id: String,
    todo: Array,
    type: Number,
    last_time: Date
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo