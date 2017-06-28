let Router = require('koa-router')
let router = new Router()

let users = require('../controls/users')
router
    .post('/register', users.register)
    .post('/login', users.login)
module.exports = router