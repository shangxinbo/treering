const request = require('supertest')
const { app } = require('../index')

describe('Todos', () => {

    describe('创建任务', () => {
        it('请求成功', done => {
            request(app.listen())
                .post('/todos/create')
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

    describe('通过序号删除', () => {
        it('请求成功', done => {

            request(app.listen())
                .post('/todos/delete')
                .send({
                    "index": "0",
                    "type": 1
                })
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) return done(err)
                    done()
                })
        })
    })

    describe('获取任务列表', () => {
        it('请求成功', done => {

            request(app.listen())
                .post('/todos/list')
                .send({
                    "type": 0
                })
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) return done(err)
                    done()
                })
        })
    })

    describe('整体保存', () => {
        it('请求成功', done => {

            request(app.listen())
                .post('/todos/saveChange')
                .send({
                    "type": 1,
                    "arr": [
                        "shangxinbo",
                        {
                            "father": "shangxinbo",
                            "children": [
                                "第2个",
                                "123123",
                                "第一个"
                            ]
                        },
                        "json",
                        {
                            "children": [
                                "第2个"
                            ],
                            "father": "auto"
                        },
                        "auto"
                    ]
                })
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) return done(err)
                    done()
                })
        })
    })

    describe('获取当前任务', () => {
        it('请求成功', done => {

            request(app.listen())
                .post('/current')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) return done(err)
                    done()
                })
        })
    })

})