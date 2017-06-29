let Users = require('../models/Users')
let Exigent = require('../models/Exigent')
let Important = require('../models/Important')
let md5 = require('md5')
let result = require('../utils/classes').result

exports.register = async (ctx, next) => {

    let name = ctx.request.body.name
    let password = ctx.request.body.password

    //name pattern
    let nameReg = /^(?=[A-Za-z])[A-Za-z0-9]{6,}$/
    //pass pattern
    let passwordReg = /^[A-Za-z0-9]{6,}$/

    if (nameReg.test(name)) {
        if (passwordReg.test(password)) {
            let query = await Users.find({ name: name })
            if (query.length > 0) {
                ctx.body = result(204, 'username has been registed')
            } else {
                try {
                    let now = new Date()
                    await Users.create({
                        name: name,
                        password: md5(password),
                        join_time: now,
                        last_time: now
                    })
                    ctx.body = result(200, 'success')
                } catch (err) {
                    ctx.body = result(203, err)
                }
            }

        } else {
            ctx.body = result(202, 'The password format is incorrect')
        }
    } else {
        ctx.body = result(201, 'The name format is incorrect')
    }
}

exports.login = async (ctx, next) => {
    let name = ctx.request.body.name
    let password = md5(ctx.request.body.password)
    let query = await Users.find({ name: name, password: password }, '_id name join_time last_time')
    if (query.length == 1) {
        ctx.session.token = query[0].id
        ctx.body = result(200, query)
    } else {
        ctx.body = result(205, 'user does not exit')
    }
}

exports.resetPassword = async (ctx, next) => {
    let name = ctx.request.body.name
    let keyword = ctx.request.body.keyword
    let user = await Users.findOne({ name: name })
    if (user && keyword.length > 3) {
        let id = user.id
        let queryTodo = await Exigent.findOne({ user_id: id })
        let queryHistory = await Exigent.find({ user_id: id })
        let alltext = []
        if (queryTodo) {
            queryTodo.todo.forEach((item, index, arr) => {
                if (typeof item == 'string') {
                    alltext.push(item)
                } else {
                    let ss = gettext(item)
                    alltext = alltext.concat(ss)
                    
                }
            })
        }

        //console.log(alltext)
    } else {
        ctx.body = result(401, 'name or kewwords error')
    }




}

exports.logout = async (ctx, next) => {
    ctx.session = null
    ctx.body = result(200, 'logout success')
}

function gettext(obj) {
    let arr = []
    arr.push(obj.father)
    obj.children.forEach((item, index, arr) => {
        if (typeof item == 'string') {
            arr.push(item)
            console.log(234)
        } else {
            arr = arr.concat(gettext(item))
        }
    })
    console.log(arr)
    return arr
}