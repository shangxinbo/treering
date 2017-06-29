let Router = require('koa-router')
let router = new Router()

let users = require('../controls/users')
let exigent = require('../controls/exigent')
let history = require('../controls/history')


async function auth(ctx, next) {
    if (ctx.session.token) {
        await next()
    } else {
        ctx.body = 'user authentication invalidation'
    }
}

router
    .post('/register', users.register)
    .post('/login', users.login)
    .post('/logout', users.logout)
    .post('/exigent/create', auth, exigent.create)
    .post('/exigent/delete', auth, exigent.remove)
    .post('/exigent/list', auth, exigent.find)
    .post('/exigent/sort', auth, exigent.sort)
    .post('/exigent/addchild', auth, exigent.createChild)
    .post('/exigent/current', auth, exigent.getCurrent)
    .post('/history/success', auth, history.overThis)
    .post('/history/fail', auth, history.failThis)


module.exports = router