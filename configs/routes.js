let Router = require('koa-router')
let router = new Router()

let users = require('../controls/users')
let exigent = require('../controls/exigent')


async function auth(ctx, next) {
    if(ctx.session.token){
        await next()
    }else{
        ctx.body = 'user authentication invalidation'
    }
}

router
    .post('/register', users.register)
    .post('/login', users.login)
    .post('/logout', users.logout)
    .post('/exigent/create',auth, exigent.create)
    .post('/exigent/delete',auth, exigent.remove)
    
module.exports = router