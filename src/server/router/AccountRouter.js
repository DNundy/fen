const AccountRouter = require('express').Router()
const AccountController = require('../controller/AccountController')

// 账户类接口
AccountRouter.post('/login', (req, res) => {
    AccountController.login(req, res)
})
AccountRouter.post('/register', (req, res) => {
    AccountController.login(req, res)
})
AccountRouter.post('/refresh', (req, res) => {
    AccountController.login(req, res)
})

module.exports = AccountRouter
