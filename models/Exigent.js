const mongoose = require('mongoose')


const ExigentSchema = new mongoose.Schema({
    user_id: String,
    todo: Array,
    last_time: Date
})

const Exigent = mongoose.model('Exigent', ExigentSchema)

module.exports = Exigent