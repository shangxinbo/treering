let Todo = require('../models/Todo')
let result = require('../utils/classes').result
let history = require('./history.js')

exports.find = async (ctx, next) => {

    let user_id = ctx.session.token
    let type = ctx.request.body.type
    let query = await Todo.findOne({ user_id: user_id, type: type })

    if (query) {
        ctx.body = result(200, query.todo.reverse())
    } else {
        ctx.body = result(303, 'there is no values')
    }
}

exports.save = async (ctx, next) => {

    let type = ctx.request.body.type
    let arr = ctx.request.body.arr
    let user_id = ctx.session.token

    if (arr instanceof Array) {
        await Todo.findOneAndUpdate({ user_id: user_id, type: type }, { todo: arr.reverse() }, { upsert: true })
        ctx.body = result(200, 'success')
    } else {
        ctx.body = result(303, 'arr is not available')
    }

}

exports.getCurrent = async (ctx, next) => {

    let user_id = ctx.session.token
    let query1 = await Todo.findOne({ user_id: user_id, type: 0 })
    let query2 = await Todo.findOne({ user_id: user_id, type: 1 })
    let arr = []

    if (query1 && query2) {
        arr = query1.todo.concat(query2.todo)
    } else {
        if (query1 || query2) {
            arr = query1 ? query1.todo : query2.todo
        }
    }

    if (arr.length > 0) {
        ctx.body = result(200, arr[arr.length-1])
    } else {
        ctx.body = result(303, 'there is no values')
    }

}
