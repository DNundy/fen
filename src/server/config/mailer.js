const nodemailer = require('nodemailer')

const mailer = {
    sendTo: (res, reqData) => {
        const url = `http://localhost:3000/api/index/Account/confirm?uid=${reqData['a_id']}&pwd=${reqData['a_password']}&time=${reqData['currentTime']}&exp=${reqData['exp']}`
        const tpl = `
            <h1>这是一封来自FEN团队的重置密码邮件</h1>\n\n
            <p>若此次操作是您本人，请点击下方链接：</p>\n\n
            <a href="${url}" style="color:red;">${url}</a>\n\n
            <p>如若不是您本人操作，请忽略此邮件，并注意<span style="color:red;">账号信息安全</span>，定期更换密码</p>\n\n
            <p>祝您生活愉快！</p>`

        const mailOptions = {
            from: '"FEN 团队" 3053915949@qq.com',
            to: `${reqData['a_email']}`,
            subject: '【重置密码】',
            html: tpl
        }
        const transporter = nodemailer.createTransport({
            service: 'QQ',
            auth: {
                user: '3053915949@qq.com',
                pass: 'obzdexwykidqdgge'
            }
        })
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.json({
                    'code': -1,
                    'msg': '邮件发送失败，一个未知的错误发生了！'
                })
            } else {
                res.json({
                    'code': 0,
                    'msg': '重置密码邮件已发送，请进入邮箱确认'
                })
            }
        })
    }
}

module.exports = mailer
