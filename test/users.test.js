const request = require('supertest')
const { app } = require('../index')

describe('Account', () => {

    describe('注册', () => {
        it('请求成功', done => {
            request(app.listen())
                .post('/register')
                .send({
                    "name": "asdfas",
                    "password": "shang123"
                })
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) return done(err)
                    done()
                })
        })
    })

    describe('登录', () => {
        it('登录', done => {

            request(app.listen())
                .post('/login')
                .send({
                    "name": "shangxinbo",
                    "password": "shang123"
                })
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) return done(err)
                    done()
                })
        })
    })

    describe('验证密码', () => {
        it('验证密码', done => {

            request(app.listen())
                .post('/verifypass')
                .send({
                    "password": "shang123"
                })
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) return done(err)
                    done()
                })
        })
    })

    describe('重置密码', () => {
        it('重置密码', done => {

            request(app.listen())
                .post('/resetpass')
                .send({
                    "name": "shangxinbo",
                    "keyword": "123123"
                })
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) return done(err)
                    done()
                })
        })
    })
    

})