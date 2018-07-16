const AccountModel = require('../model/AccountModel')
const AccountController = {
    login: (req, res) => {
        AccountModel.login(req, res)
    },
    register: (req, res) => {
        AccountModel.register(req, res)
    },
    refresh: (req, res) => {
        AccountModel.refresh(req, res)
    }
}

module.exports = AccountController
