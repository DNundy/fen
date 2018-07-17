const mysql = require('mysql')
const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost', // MySQL所在服务器IP
    user: 'root', // 用户名
    password: '', // 密码
    database: 'fen', // 数据库名称
    port: 3306, // 数据库端口号
    multipleStatements: true,
    dateStrings: true // 时间以字符串形式显示，否则会有类似这样的显示：Thu Apr 14 2016 00:00:00 GMT+0800 (中国标准时间) 17:20:12
})
const dbFen = (sql, ...params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
                return
            }
            connection.query(sql, params, (error, res) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(res)
                connection.release()
            })
        })
    })
}
module.exports = dbFen
