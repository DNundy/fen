const md5 = require('md5')
const jwt = require('../utils/jwt')

const AccountModel = require('../model/AccountModel')
const AccountController = {
    login: async (req, res) => {
        // 获取请求信息
        const reqData = {
            'a_id': req.body.id,
            'a_password': md5(req.body.password)
        }

        // 请求信息检测
        if (reqData.a_id === undefined || reqData.a_password === undefined) {
            res.json({
                'code': -1,
                'msg': '信息不能为空'
            })
        }

        // 账户ID存在性验证
        const haveId = await AccountModel.utils.checkId(reqData)
        if (!haveId) {
            res.json({
                'code': -1,
                'msg': '该账号不存在'
            })
        }

        // 账户密码匹配性验证
        const accountData = await AccountModel.utils.getData(reqData)
        if (!accountData) {
            res.json({
                'code': -1,
                'msg': '密码输入错误'
            })
        }

        // 账户是否被封锁a_blockade_time
        const currentTime = Math.floor(new Date() / 1000)
        const blockTime = accountData['a_blockade_time']
        if (blockTime > currentTime) {
            const date = Math.floor((blockTime - currentTime) / 86400)
            const hour = Math.floor((blockTime - currentTime) % 86400 / 3600)
            const minute = Math.floor((blockTime - currentTime) % 86400 % 3600 / 60)
            res.json({
                'code': -1,
                'msg': `账号距封锁结束还有${date}天${hour}小时${minute}分`
            })
        }

        // 更新Token
        const condition = {
            'accessToken': jwt.sign(accountData, 'accessToken'),
            'refreshToken': jwt.sign(accountData, 'refreshToken')
        }
        const sqlStatus = await AccountModel.login(reqData, condition)

        // 返回数据
        if (sqlStatus) {
            res.json({
                'code': 0,
                'msg': '登录成功',
                'data': {
                    'a_id': accountData['a_id'],
                    'a_name': accountData['a_name'],
                    'a_auth': accountData['a_auth'],
                    'a_email': accountData['a_email'],
                    'access_token': condition['accessToken'],
                    'refresh_token': condition['refreshToken']
                }
            })
        } else {
            res.json({
                'code': -1,
                'msg': '抱歉，一个未知的错误发生了！'
            })
        }
    },
    register: async (req, res) => {
        AccountModel.register(req, res)
    },
    refresh: async (req, res) => {
        const reqData = {
            'refresh_token': req.headers['refresh_token']
        }

        // 验证Token时效性
        const decoded = jwt.verify(reqData['refresh_token'])
        const currentTime = Math.floor(new Date() / 1000)
        if (decoded.data['exp'] < currentTime) {
            res.json({
                'code': -1,
                'msg': 'Token已过期'
            })
        }

        // 验证Token正确性
        const accountData = await AccountModel.utils.getToken(decoded.data)
        if (accountData['a_refresh_token'] !== reqData['refresh_token']) {
            res.json({
                'code': -1,
                'msg': 'Token不匹配'
            })
        }

        const condition = {
            'accessToken': jwt.sign(accountData, 'accessToken'),
            'refreshToken': jwt.sign(accountData, 'refreshToken')
        }
        const sqlStatus = await AccountModel.login(accountData, condition)
        if (sqlStatus) {
            res.json({
                'code': 0,
                'msg': '登录成功',
                'data': {
                    'a_id': accountData['a_id'],
                    'a_name': accountData['a_name'],
                    'a_auth': accountData['a_auth'],
                    'a_email': accountData['a_email'],
                    'access_token': condition['accessToken'],
                    'refresh_token': condition['refreshToken']
                }
            })
        } else {
            res.json({
                'code': -1,
                'msg': '抱歉，一个未知的错误发生了！'
            })
        }
    }
}
module.exports = AccountController
