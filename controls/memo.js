let Memo = require('../models/Memo')
let result = require('../utils/classes').result
let crypto = require('crypto')

exports.find = async (ctx, next) => {
    let user_id = ctx.session.token
    let query = await Memo.findOne({ user_id: user_id })
    if (query) {
        let content = decipher(user_id, query.content)
        console.log(content)
        ctx.body = result(200, content)
    } else {
        ctx.body = result(303, 'there is no values')
    }
}

exports.save = async (ctx, next) => {
    let user_id = ctx.session.token
    let content = ctx.request.body.content
    let now = new Date()
    let content_encrypt = cipher(user_id, content)
    let ss = await Memo.findOneAndUpdate({ user_id: user_id }, { content: content_encrypt, last_time: now }, { upsert: true })
    ctx.body = result(200, 'success')
}

function cipher(key, buf) {
    let encrypted = ""
    let cip = crypto.createCipher('aes-256-cbc', key)
    encrypted += cip.update(buf, 'utf8', 'hex')
    encrypted += cip.final('hex')
    return encrypted
}

function decipher(key, encrypted) {
    let decrypted = ""
    let decipher = crypto.createDecipher('aes-256-cbc', key)
    decrypted += decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}
