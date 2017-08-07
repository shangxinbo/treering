const request = require('supertest')
const { app } = require('../index')

describe('History', () => {

    describe('查询备忘', () => {
        it('请求成功', done => {
            request(app.listen())
                .post('/memo/view')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) return done(err)
                    done()
                })
        })
    })

    describe('保存备忘', () => {
        it('请求成功', done => {

            request(app.listen())
                .post('/memo/save')
                .send({
                    "content": "asdfa"
                })
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) return done(err)
                    done()
                })
        })
    })

})