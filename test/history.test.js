const request = require('supertest')
const { app } = require('../index')

describe('History', () => {

    describe('获取历史记录', () => {
        it('请求成功', done => {
            request(app.listen())
                .post('/history/list')
                .send({
                    "text": "auto",
                    "type": 1
                })
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) return done(err)
                    done()
                })
        })
    })

    describe('处理任务', () => {
        it('请求成功', done => {

            request(app.listen())
                .post('/history/add')
                .send({
                    "text": "asdfa",
                    "status": 1
                })
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) return done(err)
                    done()
                })
        })
    })

})