let Users = require('../models/Users')
let md5 = require('md5')
let result = require('../utils/classes').result


exports.register = async (ctx, next) => {

    let name = ctx.request.body.name
    let password = ctx.request.body.password
    let email = ctx.request.body.email

    //name pattern
    let nameReg = /^(?=[A-Za-z])[A-Za-z0-9]{6,}$/
    
    let emailReg = /^[a-z0-9]+([._\-][a-z0-9])@([a-z0-9]+[a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
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
        ctx.session.token = md5(name)
        ctx.body = result(200, query)
    } else {
        ctx.body = result(205, 'user does not exit')
    }
}

exports.resetPassword = async (ctx, next) => {
    
}