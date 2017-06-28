const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    join_time: Date,
    last_time: Date
})

const User = mongoose.model('User', UserSchema)

module.exports = User