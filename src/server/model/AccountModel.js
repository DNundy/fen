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
    },
    utils: {
        checkId: async (reqData) => {
            const sql = 'SELECT a_id FROM fen_account WHERE a_id=' + reqData.a_id
            const data = await _connect(sql)
            return data
        },
        getData: async (res, reqData) => {
            const sql = `SELECT * FROM fen_account WHERE a_id='${reqData.a_id}' AND a_password='${reqData.a_password}'`
            const data = await _connect(sql)
            return data
        }
    }
}

module.exports = AccountModel
