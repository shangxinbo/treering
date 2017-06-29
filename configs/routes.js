let Router = require('koa-router')
let router = new Router()

let users = require('../controls/users')
let todos = require('../controls/todos')
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
    .post('/resetpass', users.resetPassword)
    .post('/todos/create', auth, todos.create)
    .post('/todos/delete', auth, todos.remove)
    .post('/todos/list', auth, todos.find)
    .post('/todos/sort', auth, todos.sort)
    .post('/todos/addchild', auth, todos.createChild)
    .post('/todos/current', auth, todos.getCurrent)
    .post('/history/success', auth, history.overThis)
    .post('/history/fail', auth, history.failThis)


module.exports = router