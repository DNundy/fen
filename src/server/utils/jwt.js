import jsonwebtoken from 'jsonwebtoken'

const KEY = 'fenqsceszqwezxcasd'
const INFO = {
    'issuer': 'Nundy',
    'subject': 'FEN'
}

const jwt = {
    sign: (data, type) => {
        const currentTime = Math.floor(new Date() / 1000)
        let result = ''
        if (type === 'accessToken') {
            result = jsonwebtoken.sign({
                data: {
                    'a_id': data['a_id'],
                    'a_password': data['a_password'],
                    'a_email': data['a_email'],
                    'a_auth': 0
                }
            }, KEY, INFO)
        } else if (type === 'refreshToken') {
            result = jsonwebtoken.sign({
                data: {
                    'a_id': data['a_id'],
                    'exp': currentTime + 604800
                }
            }, KEY, INFO)
        }
        return result
    },
    verify: (token) => {
        const result = jsonwebtoken.verify(token, KEY)
        return result
    }
}

module.exports = jwt
