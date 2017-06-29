let Exigent = require('../models/Exigent')
let result = require('../utils/classes').result


//create a top level exigent todo and set this to the top of queue
exports.create = async (ctx, next) => {
    let text = ctx.request.body.text
    let user_id = ctx.session.token
    let now = new Date()

    let query = await Exigent.findOne({ user_id: user_id })
    try {
        if (query) {
            let oldTodo = query.todo
            oldTodo.push(text)
            await Exigent.findOneAndUpdate({ user_id: user_id }, { todo: oldTodo, last_time: now })
        } else {
            await Exigent.create({
                user_id: user_id,
                todo: text,
                last_time: now
            })
        }
        ctx.body = result(200, 'create success')
    } catch (err) {

        ctx.body = result(301, err)
    }
}

//create a child for a father todo
exports.createChild = async (ctx, next) => {

}

//query all todo list by this user
exports.find = async (ctx, next) => {

}

//sort todo list
exports.sort = async (ctx, next) => {

}

//split this todo into children todos
exports.split = async (ctx, next) => {

}

//get the info of current doing todo
exports.getCurrent = async (ctx, next) => {

}

//set success status for this todo
exports.overThis = async (ctx, next) => {

}