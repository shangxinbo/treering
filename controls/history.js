let History = require('../models/History')
let Todo = require('../models/Todo')
let result = require('../utils/classes').result

exports.add = async (ctx, next) => {

    let text = ctx.request.body.text
    let status = ctx.request.body.status
    let user_id = ctx.session.token
    let now = new Date()
    let query1 = await Todo.findOne({ user_id: user_id, type: 0 })
    let query2 = await Todo.findOne({ user_id: user_id, type: 1 })

    let handle = async (last, todo, type) => {
        if (last == text) {
            await History.create({
                user_id,
                text,
                status: status ? status : 1,
                end_time: now
            })
            todo.pop()
            await Todo.findOneAndUpdate({ user_id: user_id, type: type }, { todo: todo, last_time: now })
            ctx.body = result(200, 'success')
        } else {
            ctx.body = result(303, 'there is no values')
        }
    }

    if (query1 && query1.todo.length > 0) {
        await handle(query1.todo[query1.todo.length - 1], query1.todo, 0)
    }

    if (query2 && query2.todo.length > 0) {
        await handle(query1.todo[query1.todo.length - 1], query2.todo, 1)
    }

}

exports.find = async (ctx, next) => {
    let user_id = ctx.session.token
    let query = await History.find({ user_id: user_id })
    if (query) {
        ctx.body = result(200, query.reverse())
    } else {
        ctx.body = result(303, 'there is no values')
    }
}