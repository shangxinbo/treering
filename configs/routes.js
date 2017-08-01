let Router = require('koa-router')
let router = new Router()

let users = require('../controls/users')
let todos = require('../controls/todos')
let history = require('../controls/history')
let memo = require('../controls/memo')


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
    .post('/verifypass', auth, users.verifyPass)
    .post('/todos/create', auth, todos.create)
    .post('/todos/delete', auth, todos.remove)
    .post('/todos/list', auth, todos.find)
    .post('/todos/sort', auth, todos.sort)
    .post('/todos/saveChange', auth, todos.saveChange)
    .post('/todos/addchild', auth, todos.createChild)
    .post('/current', auth, todos.getCurrent)
    .post('/history/add', auth, history.add)
    .post('/history/list', auth, history.find)
    .post('/memo/view', auth, memo.find)
    .post('/memo/save', auth, memo.save)


module.exports = router