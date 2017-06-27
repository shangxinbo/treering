const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    tel: String,
    name: String,
    join_time: Number,
    last_time: Number
})

UserSchema.statics.add = function (obj,cb) {
    this.create(obj,cb)
}

const User = mongoose.model('User', UserSchema)

module.exports = User