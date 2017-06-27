let Router = require('koa-router')
let User = require('../models/Users')
let router = new Router()

router.get('/', function (ctx, next) {
    // ctx.router available

    User.add({
        tel: '18612119498',
        name: 'shangxinbo',
        join_time: new Date().getTime(),
        last_time: new Date().getTime(),
    }, () => {
        console.log(123)
    })
    ctx.body = 'Hello World!';
});
module.exports = router