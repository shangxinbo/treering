const request = require('supertest')
const Users = require('../controls/users.js')

describe('Account', () => {

    describe('注册', () => {
        it('注册成功', done => {
            Users.register()
            http.get(`http://127.0.0.1:${config.httpPort}`, res => {
                done()
            })
        })
    })

    describe('Agent模块', () => {
        it('http', done => {
            http.get('http://www.baidu.com', res => {
                magent.http(30000, () => {
                    done()
                })(res, res)
            })
        })
        it('https', done => {
            https.get('https://www.baidu.com', res => {
                magent.https(30000, () => {
                    done()
                })(res, res)
            })
        })
    })
    
})