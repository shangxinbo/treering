
let History = require('../models/History')
let result = require('../utils/classes').result

//add a history
exports.add = async (user_id, text) => {
    let join_time = new Date()
    let end_time = ''
    if (text) {
        let model = await History.create({
            user_id,
            text,
            status: 0,
            join_time,
            end_time
        })
        return model.id
    } else {
        return null
    }
}

//set success status for this todo
exports.overThis = async (ctx, next) => {
    let id = ctx.request.body.id
    let now = new Date()
    try {
        await History.findByIdAndUpdate(id, {
            status: 1,
            end_time: now
        })
        ctx.body = result(200, 'success')
    } catch (err) {
        ctx.body = result(200, err)
    }
}

//set fail status for this todo
exports.failThis = async (ctx, next) => {
    let id = ctx.request.body.id
    let now = new Date()
    try {
        await History.findByIdAndUpdate(id, {
            status: -1,
            end_time: now
        })
        ctx.body = result(200, 'success')
    } catch (err) {
        ctx.body = result(200, err)
    }
}