const _connect = require('../config/mysql')

const AccountModel = {
    login: (req, res) => {
        _connect.query('select * from fen_account', (err, result, fields) => {
            if (err) throw err
            res.json(result)
        })
    },
    register: (req, res) => {
        _connect.query('select * from fen_account', (err, result, fields) => {
            if (err) throw err
            res.json(result)
        })
    },
    refresh: (req, res) => {
        _connect.query('select * from fen_account', (err, result, fields) => {
            if (err) throw err
            res.json(result)
        })
    }
}

module.exports = AccountModel
