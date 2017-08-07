
let History = require('../models/History')
let Exigent = require('../models/Exigent')
let Important = require('../models/Important')
let result = require('../utils/classes').result

//set success status for this todo
exports.add = async (ctx, next) => {
    let text = ctx.request.body.text
    let status = ctx.request.body.status
    let user_id = ctx.session.token
    let now = new Date()

    let query1 = await Exigent.findOne({ user_id: user_id })
    let query2 = await Important.findOne({ user_id: user_id })
    let type = 0
    let todo
    if (query1 && query1.todo.length > 0) {
        type = 1
        todo = query1.todo
    } else if (query2 && query2.todo.length > 0) {
        type = 2
        todo = query2.todo
    }
    let last = todo[todo.length - 1]

    if (typeof last == 'string') {
        if (last == text) {
            todo.pop()
            await History.create({
                user_id,
                text,
                status: status ? status : 1,
                end_time: now
            })
        }
    } else if (typeof last == 'object') {
        if (last.children[last.children.length - 1] == text) {
            if (last.children.length > 1) {
                last.children.pop()
            } else {
                todo.pop()
            }
            await History.create({
                user_id,
                text: '【' + last.father + '】' + text,
                status: status ? status : 1,
                end_time: now
            })
        }
    }

    if (type != 0) {
        if (type == 1) {
            await Exigent.findOneAndUpdate({ user_id: user_id }, { todo: todo, last_time: now })
        } else {
            await Important.findOneAndUpdate({ user_id: user_id }, { todo: todo, last_time: now })
        }
        ctx.body = result(200, 'success')
    } else {
        ctx.body = result(303, 'there is no values')
    }

}


function getlast(obj) {
    let arr = obj.children
    let last = arr[arr.length - 1]
    if (typeof last == 'string') {
        return last
    } else {
        return getlast(obj)
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