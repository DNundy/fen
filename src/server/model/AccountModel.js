const _connect = require('../config/mysql')

const AccountModel = {
    login: async (reqData, condition) => {
        const sql = `UPDATE fen_account SET a_access_token='${condition.accessToken}', a_refresh_token='${condition.refreshToken}' WHERE a_id=${reqData.a_id}`
        const data = await _connect(sql)
        return data['changedRows']
    },
    register: async (reqData) => {
        const sql = `INSERT fen_account (a_id,a_name,a_email,a_password,a_auth,a_access_token,a_refresh_token,a_account_time) VALUES ('${reqData['a_id']}','${reqData['a_name']}','${reqData['a_email']}','${reqData['a_password']}','${reqData['a_auth']}','${reqData['a_access_token']}','${reqData['a_refresh_token']}','${reqData['a_account_time']}')`
        const data = await _connect(sql)
        return data['affectedRows']
    },
    utils: {
        checkId: async (reqData) => {
            const sql = `SELECT a_id FROM fen_account WHERE a_id=${reqData.a_id}`
            const data = await _connect(sql)
            return data[0]
        },
        checkName: async (reqData, res) => {
            const sql = `SELECT a_name FROM fen_account WHERE a_name='${reqData.a_name}'`
            const data = await _connect(sql)
            return data[0]
        },
        checkEmail: async (reqData) => {
            const sql = `SELECT a_email FROM fen_account WHERE a_email='${reqData.a_email}'`
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
