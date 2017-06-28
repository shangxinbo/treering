let Users = require('../models/Users')
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
            await Users.create({
                name: name,
                password: md5(password),
                join_time: new Date().getTime(),
                last_time: new Date().getTime(),
            })
            ctx.body = result(200,'success')
        } else {

            ctx.body = result(202, 'The password format is incorrect')

        }
    } else {

        ctx.body = result(201, 'The name format is incorrect')

    }

}

exports.login = (ctx, next) => {

}