const md5 = require('md5')
const mailer = require('../config/mailer')
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
        const accountData = await AccountModel.utils.getDataByPwd(reqData)
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
        const reqData = {
            'a_name': req.body.name,
            'a_id': req.body.id,
            'a_email': req.body.email,
            'a_password': md5(req.body.password)
        }
        if (!reqData['a_name'] || !reqData['a_id'] || !reqData['a_email'] || !reqData['a_password']) {
            res.json({
                'code': -1,
                'msg': '信息不能为空'
            })
        }

        const haveName = await AccountModel.utils.checkName(reqData, res)
        if (haveName) {
            res.json({
                'code': -1,
                'msg': '该用户名已被使用'
            })
        }
        const haveId = await AccountModel.utils.checkId(reqData)
        if (haveId) {
            res.json({
                'code': -1,
                'msg': '该手机号码已被使用'
            })
        }

        const haveEmail = await AccountModel.utils.checkEmail(reqData)
        if (haveEmail) {
            res.json({
                'code': -1,
                'msg': '该邮箱已被使用'
            })
        }

        const token = {
            'accessToken': jwt.sign(reqData, 'accessToken'),
            'refreshToken': jwt.sign(reqData, 'refreshToken')
        }
        const accountData = {
            'a_name': reqData['a_name'],
            'a_id': reqData['a_id'],
            'a_email': reqData['a_email'],
            'a_password': reqData['a_password'],
            'a_auth': 0,
            'a_access_token': token.accessToken,
            'a_refresh_token': token.refreshToken
        }
        const sqlStatus = await AccountModel.register(accountData)
        if (sqlStatus) {
            res.json({
                'code': 0,
                'msg': '注册成功',
                'data': {
                    'a_name': reqData['a_name'],
                    'a_id': reqData['a_id'],
                    'a_email': reqData['a_email'],
                    'a_auth': 0,
                    'access_token': token.accessToken,
                    'refresh_token': token.refreshToken
                }
            })
        } else {
            res.json({
                'code': -1,
                'msg': '抱歉，一个未知答错误发生了'
            })
        }
    },
    forget: async (req, res) => {
        const currentTime = Math.floor(new Date() / 1000)
        const reqData = {
            'a_id': req.body.id,
            'a_email': req.body.email,
            'a_password': md5(req.body.password),
            'currentTime': currentTime,
            'exp': currentTime + 3600
        }
        if (!reqData['a_id'] || !reqData['a_email'] || !reqData['a_password']) {
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

        // 账户邮箱匹配性验证
        const accountData = await AccountModel.utils.getDataByEmail(reqData)
        if (!accountData) {
            res.json({
                'code': -1,
                'msg': '邮箱输入错误'
            })
        }

        const setStatus = await AccountModel.utils.setPwdTemp(reqData)
        if (setStatus) {
            mailer.sendTo(res, '2582004701@qq.com', reqData)
        } else {
            res.json({
                'code': -1,
                'msg': '抱歉，一个未知的错误发生了！'
            })
        }
    },
    confirm: async (req, res) => {
        const reqData = {
            'a_id': req.query.uid,
            'a_password': req.query.pwd
        }

        // 判断失效时间
        const currentTime = Math.floor(new Date() / 1000)
        if (currentTime > req.query.exp) {
            res.json({
                'code': -1,
                'msg': '抱歉，该链接已失效'
            })
        }

        // 查询重置密码缓存并判断是否一致
        const info = `${req.query.pwd}||${req.query.time}||${req.query.exp}`
        const pwdTemp = await AccountModel.utils.getPwdTemp(reqData)
        if (!pwdTemp) {
            res.json({
                'code': -1,
                'msg': '抱歉，一个未知的错误发生了！'
            })
        }
        if (pwdTemp['a_pwd_temp'] !== info) {
            res.json({
                'code': -1,
                'msg': '该链接无效链接，请重新确认！'
            })
        }

        // 最终更新操作
        const sqlStatus = await AccountModel.forget(reqData)
        if (sqlStatus) {
            res.redirect('http://localhost:3000/#/tips?info="恭喜您，密码重置成功！"')
        } else {
            res.json({
                'code': -1,
                'msg': '抱歉，一个未知的错误发生了！'
            })
        }
    },
    refresh: async (req, res) => {
        const reqData = {
            'refresh_token': req.headers['refresh_token']
        }
        const decoded = jwt.verify(reqData['refresh_token'])
        const currentTime = Math.floor(new Date() / 1000)
        if (decoded.data['exp'] < currentTime) {
            res.json({
                'code': -1,
                'msg': 'Token已过期'
            })
        }
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
