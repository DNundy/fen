const _connect = require('../config/mysql')

const AccountModel = {
    login: async (reqData, condition) => {
        const sql = `UPDATE fen_account SET a_access_token='${condition.accessToken}', a_refresh_token='${condition.refreshToken}' WHERE a_id=${reqData.a_id}`
        const data = await _connect(sql)
        return data['changedRows']
    },
    register: async (req, res) => {
    },
    refresh: async (req, res) => {
    },
    utils: {
        checkId: async (reqData) => {
            const sql = `SELECT a_id FROM fen_account WHERE a_id=${reqData.a_id}`
            const data = await _connect(sql)
            return data[0]
        },
        getData: async (reqData) => {
            const sql = `SELECT * FROM fen_account WHERE a_id='${reqData.a_id}' AND a_password='${reqData.a_password}'`
            const data = await _connect(sql)
            return data[0]
        },
        getToken: async (tokenData) => {
            const sql = `SELECT * FROM fen_account WHERE a_id='${tokenData.a_id}'`
            const data = await _connect(sql)
            return data[0]
        }
    }
}

module.exports = AccountModel
