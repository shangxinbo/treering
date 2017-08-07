let Koa = require('koa')
let mongoose = require('mongoose')
let bodyParser = require('koa-bodyparser')
let session = require('koa-session')
const serve = require('koa-static')
let router = require('./configs/routes')
console.log(123)
const dbconf = require('./configs/database.js')
console.log(123)
const DB = `mongodb://${dbconf.name}:${dbconf.pwd}@127.0.0.1:27017/treering`    //mongodb server

mongoose.Promise = require('bluebird')

let app = new Koa()

app.keys = ['malimalihong']

const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false
}


app.use(bodyParser())
app.use(session(CONFIG, app))
app.use(serve('./statics'))

app
    
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => { console.log('Server listened at: http://127.0.0.1:3000') })

mongoose.connect(DB)

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected success')
})

mongoose.connection.on('error', function (err) {
    console.log('Mongoose error: ' + err)
})


app.on('error', function (err) {
    console.error(err.stack)
    console.log(err.message)
})

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed through app termination')
        process.exit(0)
    })
})

exports.app = app