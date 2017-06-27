let Koa = require('koa')
let mongoose = require('mongoose');
let router = require('./configs/routes')

const DB = 'mongodb://127.0.0.1:27017/treering'    //mongodb server

let app = new Koa()
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
    });
});