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
    let father = ctx.request.body.father   //'0-0-2' todo[0][0][2]
    let text = ctx.request.body.text
    let user_id = ctx.session.token
    let query = await Exigent.findOne({ user_id: user_id })
    let now = new Date()

    father = father.split('-')

    if (query) {
        let todos = query.todo
        let tmp = todos
        let ss = todos

        father.forEach((item, index, arr) => {
            tmp = tmp[item]
            if (index == arr.length - 2) {
                ss = tmp
            }
        })

        try {
            if (typeof tmp == 'string') {
                tmp = {
                    father: tmp,
                    children: [text]
                }
                ss[father[father.length - 1]] = tmp
                await Exigent.findOneAndUpdate({ user_id: user_id }, { todo: todos, last_time: now })
                ctx.body = result(200, 'create success')
            } else {
                tmp.children.push(text)
                await Exigent.findOneAndUpdate({ user_id: user_id }, { todo: todos, last_time: now })
                ctx.body = result(200, 'create success')
            }
        } catch (err) {
            ctx.body = result(304, err)
        }

    } else {
        ctx.body = result(302, 'none of exigent todos')
    }

}

//remove todo by index
exports.remove = async (ctx, next) => {
    let index = ctx.request.body.index.split('-')  //'0-1-3' remove todo[0][1][3]
    let user_id = ctx.session.token
    let now = new Date()
    let query = await Exigent.findOne({ user_id: user_id })
    if (query) {
        let todos = query.todo
        if (todos.length > 0) {
            let s = todos
            let tmp = todos
            index.forEach((item, index, arr) => {
                tmp = tmp[item]
                if (index == arr.length - 2) {
                    s = tmp.children
                }
            })
            s.splice(index[index.length - 1], 1)
            await Exigent.findOneAndUpdate({ user_id: user_id }, { todo: todos, last_time: now })
            ctx.body = result(200, 'delete success')
        } else {
            ctx.body = result(302, 'none of exigent todos')
        }
    } else {
        ctx.body = result(302, 'none of exigent todos')
    }
}

//query all todo list by this user
exports.find = async (ctx, next) => {
    let user_id = ctx.session.token
    let query = await Exigent.findOne({ user_id: user_id })
    if (query) {
        ctx.body = result(200, query.todo)
    } else {
        ctx.body = result(303, 'there is no values')
    }
}

//sort todo list
exports.sort = async (ctx, next) => {
    let father = ctx.request.body.father.split('-')  //'0-2'  todos[0][2]
    let oldloc = ctx.request.body.oldloc
    let newloc = ctx.request.body.newloc
    let user_id = ctx.session.token
    let query = await Exigent.findOne({ user_id: user_id })
    if (query) {
        let todos = query.todo
        let tmp = todos
        father.forEach((item, index, arr) => {
            tmp = tmp[item].children
        })
        let value = tmp[oldloc]
        if (value) {
            tmp.splice(oldloc, 1)
            tmp.splice(newloc, 0, value)
            await Exigent.findOneAndUpdate({ user_id: user_id, todo: todos })
            ctx.body = result(200, 'sort success')
        } else {
            ctx.body = result(303, 'value not fit')
        }
    } else {
        ctx.body = result(303, 'there is no values')
    }
}


//get the info of current doing todo
exports.getCurrent = async (ctx, next) => {
    let user_id = ctx.session.token
    let query = await Exigent.findOne({ user_id: user_id })
    if (query) {
        let todos = query.todo
        console.log(todos)
        let last = todos[todos.length-1]
        if(typeof last == 'string'){
            ctx.body = result(200,last)
        }else{
            ctx.body = result(200,getlast(last))
        }
    } else {
        ctx.body = result(303, 'there is no values')
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
}

//set success status for this todo
exports.overThis = async (ctx, next) => {

}