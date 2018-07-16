const AccountModel = require('../model/AccountModel')
const md5 = require('md5')
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
        const accountData = await AccountModel.utils.getData(res, reqData)
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
        res.json(blockTime)
    },
    register: (req, res) => {
        AccountModel.register(req, res)
    },
    refresh: (req, res) => {
        AccountModel.refresh(req, res)
    }
}
module.exports = AccountController
