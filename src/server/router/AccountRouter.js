const AccountRouter = require('express').Router()
const AccountController = require('../controller/AccountController')

// 账户类接口
AccountRouter.post('/login', (req, res) => {
    AccountController.login(req, res)
})
AccountRouter.post('/register', (req, res) => {
    AccountController.register(req, res)
})
AccountRouter.post('/forget', (req, res) => {
    AccountController.forget(req, res)
})
AccountRouter.post('/refresh', (req, res) => {
    AccountController.refresh(req, res)
})

module.exports = AccountRouter
