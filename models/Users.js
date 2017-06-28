const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name: Number,
    password: String,
    join_time: Number,
    last_time: Number
})

const User = mongoose.model('User', UserSchema)

module.exports = User